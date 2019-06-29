const path = require('path');
const merge = require('deepmerge');
const npsUtils = require('nps-utils');

const {EXTENSIONS_WITH_DOT, SRC_DIR, OUT_DIR} = require('etc/constants');


/**
 * If required by our local package-scripts file, returns the provided binary
 * name unmodified. Otherwise, prepends the bin prefix used by this package to
 * ensure that consumers reference our binaries.
 */
function prefixBin(binName) {
  const binPrefix = 'unified';

  if (module.parent && module.parent.id === path.resolve(__dirname, '..', '..', 'package-scripts.js')) {
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

  const babel = [
    `${prefixBin('babel')} ${SRC_DIR}`,
    `--extensions="${EXTENSIONS_WITH_DOT.join(',')}"`,
    `--ignore="**/*.spec.*,**/*.d.ts"`,
    `--out-dir="${OUT_DIR}"`,
    `--copy-files`,
    `--source-maps=true`
  ].join(' ');

  const ttsc = `${prefixBin('ttsc')} --pretty`;
  const postBuild = `${prefixBin('del')} ${OUT_DIR}/**/*.spec.*`;

  const build = {
    default: {
      description: 'Build the project.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : '',
        clean.script,
        npsUtils.concurrent({lint: lint.script, babel, tsc: ttsc}),
        postBuild,
        // If there is a user-defined script named 'postbuild', run it.
        userScripts.scripts && userScripts.scripts.postbuild ? 'nps postbuild' : ''
      ].filter(Boolean))
    },
    watch: {
      description: 'Continuously build the project',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : '',
        clean.script,
        npsUtils.concurrent({
          tsc: `${ttsc} --preserveWatchOutput --watch`,
          babel: `${babel} --watch --verbose`
        })
      ].filter(Boolean))
    }
  };

  const bump = {
    default: {
      description: 'Generates a change log and tagged commit for a release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        prefixBin('standard-version'),
        // If there is a user-defined script named 'postbump', run it.
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : ''
      ].filter(Boolean))
    },
    beta: {
      description: 'Generates a change log and tagged commit for a beta release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        `${prefixBin('standard-version')} --prerelease=beta`,
        // If there is a user-defined script named 'postbump', run it.
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : ''
      ].filter(Boolean))
    },
    first: {
      description: 'Generates a change log and tagged commit for a project\'s first release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : '',
        build.default.script,
        `${prefixBin('standard-version')} --first-release`,
        // If there is a user-defined script named 'postbump', run it.
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

  return merge({
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
}
