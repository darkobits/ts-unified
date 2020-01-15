import path from 'path';
import merge from 'deepmerge';
// @ts-ignore
import * as npsUtils from 'nps-utils';

import {
  EXTENSIONS_WITH_DOT,
  SRC_DIR,
  OUT_DIR
} from 'etc/constants';


/**
 * If required by our local package-scripts file, returns the provided binary
 * name unmodified. Otherwise, prepends the bin prefix used by this package to
 * ensure that consumers reference our binaries.
 */
function prefixBin(binName: string) {
  const binPrefix = 'unified';

  if (module.parent && module.parent.id === path.resolve(__dirname, '..', '..', 'package-scripts.js')) {
    return binName;
  }

  return `${binPrefix}.${binName}`;
}


export default (userScripts: any = {}) => {
  const scripts: any = {};


  // ----- Misc ----------------------------------------------------------------

  scripts.clean = {
    description: 'Removes stale build artifacts.',
    script: `${prefixBin('del')} ${OUT_DIR}`
  };

  scripts.lint = {
    description: 'Lints the project.',
    script: `${prefixBin('tslint')} --project tsconfig.json  --format codeFrame`
  };


  // ----- Testing -------------------------------------------------------------

  scripts.test = {
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

  scripts.checkDeps = {
    description: 'Check for newer versions of installed dependencies.',
    script: 'npm-check --skip-unused || true'
  };


  // ----- Building ------------------------------------------------------------

  const babel = [
    `${prefixBin('babel')} ${SRC_DIR}`,
    `--extensions="${EXTENSIONS_WITH_DOT.join(',')}"`,
    '--ignore="**/*.d.ts"',
    `--out-dir="${OUT_DIR}"`,
    '--copy-files',
    '--source-maps=true'
  ].join(' ');

  const ttsc = `${prefixBin('ttsc')} --pretty`;

  // Babel's --ignore argument doesn't work as explained in the docs, especially
  // with multiple patterns. It is easier to just go through the output folder
  // and clean up what we don't want.
  const postBuild = `${prefixBin('del')} ${OUT_DIR}/**/*.spec.*`;

  scripts.build = {
    default: {
      description: 'Build the project.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : undefined,
        scripts.clean.script,
        npsUtils.concurrent({lint: scripts.lint.script, babel, tsc: ttsc}),
        postBuild,
        // If there is a user-defined script named 'postbuild', run it.
        userScripts.scripts && userScripts.scripts.postbuild ? 'nps postbuild' : undefined
      ].filter(Boolean))
    },
    watch: {
      description: 'Continuously build the project',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        userScripts.scripts && userScripts.scripts.prebuild ? 'nps prebuild' : undefined,
        scripts.clean.script,
        npsUtils.concurrent({
          tsc: `${ttsc} --preserveWatchOutput --watch`,
          babel: `${babel} --watch --verbose`
        })
      ].filter(Boolean))
    }
  };


  // ----- Versioning ----------------------------------------------------------

  scripts.bump = {
    default: {
      description: 'Generates a change log and tagged commit for a release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : undefined,
        scripts.build.default.script,
        prefixBin('standard-version'),
        // If there is a user-defined script named 'postbump', run it.
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    },
    beta: {
      description: 'Generates a change log and tagged commit for a beta release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : undefined,
        scripts.build.default.script,
        `${prefixBin('standard-version')} --prerelease=beta`,
        // If there is a user-defined script named 'postbump', run it.
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    },
    first: {
      description: 'Generates a change log and tagged commit for a project\'s first release.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebump', run it.
        userScripts.scripts && userScripts.scripts.prebump ? 'nps prebump' : undefined,
        scripts.build.default.script,
        `${prefixBin('standard-version')} --first-release`,
        // If there is a user-defined script named 'postbump', run it.
        userScripts.scripts && userScripts.scripts.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    }
  };


  // ----- Lifecycles ----------------------------------------------------------

  scripts.prepare = {
    description: 'Runs after "npm install" to ensure the package compiles correctly.',
    script: npsUtils.series(scripts.build.default.script, `${scripts.test.default.script} --passWithNoTests`)
  };


  return merge({
    scripts
  }, userScripts);
};
