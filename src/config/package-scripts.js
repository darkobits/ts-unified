const path = require('path');
const merge = require('deepmerge');
const npsUtils = require('nps-utils');

const {SRC_DIR, OUT_DIR, EXTENSIONS_WITH_DOT} = require('../etc/constants');


/**
 * If required by our local package-scripts file, returns the provided binary
 * name unmodified. Otherwise, prepends the bin prefix used by this package to
 * ensure that consumers reference our binaries.
 */
function prefixBin(binName) {
  const binPrefix = 'unified';

  if (module.parent.id === path.resolve(__dirname, '..', '..', 'package-scripts.js')) {
    return binName;
  }

  return `${binPrefix}.${binName}`;
}


module.exports = (userScripts = {}) => {
  const clean = {
    description: 'Removes stale build artifacts.',
    script: `${prefixBin('del')} ${OUT_DIR}`
  };

  const lint = {
    description: 'Lints the project.',
    script: `${prefixBin('tslint')} --project tsconfig.json  --format codeFrame`
  };

  const test = {
    default: {
      description: 'Run unit tests.',
      script: prefixBin('jest')
    },
    watch: {
      description: 'Run unit tests in watch mode.',
      script: `${prefixBin('jest')} --watch`
    },
    coverage: {
      description: 'Run unit tests and generate a coverage report.',
      script: `${prefixBin('jest')} --coverage`
    }
  };

  const ttsc = `${prefixBin('ttsc')} --pretty`;
  const postBuild = `${prefixBin('del')} ${OUT_DIR}/**/*.spec.*`;

  const build = {
    default: {
      description: 'Build the project.',
      script: npsUtils.series(...[
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : '',
        clean.script,
        lint.script,
        ttsc,
        postBuild,
        userScripts.scripts && userScripts.scripts.postbuild ? 'nps postbuild' : ''
      ].filter(Boolean))
    },
    watch: {
      description: 'Continuously build the project',
      script: npsUtils.series(...[
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : '',
        clean.script,
        `${ttsc} --preserveWatchOutput --watch`
      ].filter(Boolean))
    }
  };

  const bump = {
    default: {
      description: 'Generates a change log and tagged commit for a release.',
      script: npsUtils.series(...[
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        prefixBin('standard-version'),
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : ''
      ].filter(Boolean))
    },
    beta: {
      description: 'Generates a change log and tagged commit for a beta release.',
      script: npsUtils.series(...[
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        `${prefixBin('standard-version')} --prerelease=beta`,
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : ''
      ].filter(Boolean))
    },
    first: {
      description: 'Generates a change log and tagged commit for a project\'s first release.',
      script: npsUtils.series(...[
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        `${prefixBin('standard-version')} --first-release`,
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : ''
      ].filter(Boolean))
    }
  };

  const checkDeps = {
    description: 'Check for newer versions of installed dependencies.',
    script: 'npm-check --skip-unused'
  };

  const prepare = {
    description: 'Runs after "npm install" to ensure the package compiles correctly.',
    script: npsUtils.series(build.default.script, `${test.default.script} --passWithNoTests`)
  };


  const finalScripts = merge({
    scripts: {
      clean,
      lint,
      test,
      build,
      bump,
      checkDeps,
      prepare
    }
  }, userScripts);

  return finalScripts;
};
