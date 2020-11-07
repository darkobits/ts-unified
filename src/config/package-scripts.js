import path from 'path';
import merge from 'deepmerge';
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
const prefixBin = binName => {
  const binPrefix = 'unified';

  if (module.parent && module.parent.id === path.resolve(__dirname, '..', '..', 'package-scripts.js')) {
    return binName;
  }

  return `${binPrefix}.${binName}`;
};


export default userArgument => {
  let userScripts;

  if (typeof userArgument === 'function') {
    userScripts = userArgument({
      npsUtils,
      bin: prefixBin
    });
  } else if (typeof userArgument === 'object') {
    userScripts = userArgument;
  } else {
    userScripts = {};
  }

  const scripts = {};


  // ----- Dependency Management -----------------------------------------------

  scripts.deps = {
    check: {
      description: 'Check for newer versions of installed dependencies.',
      script: 'npm-check --skip-unused || true'
    }
  };


  // ----- Linting -------------------------------------------------------------

  scripts.lint = {
    description: 'Lint the project.',
    script: `${prefixBin('eslint')} src --ext .ts,.tsx,.js,.jsx --format=node_modules/eslint-codeframe-formatter`,
    fix: {
      description: 'Lint the project and automatically fix all fixable errors.',
      script: `${prefixBin('eslint')} src --ext .ts,.tsx,.js,.jsx --format=node_modules/eslint-codeframe-formatter --fix`
    }
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
    },
    passWithNoTests: {
      description: 'Run unit tests, but do not fail if no tests exist.',
      script: `${prefixBin('jest')} --passWithNoTests`
    }
  };


  // ----- Babel ---------------------------------------------------------------

  const BABEL_COMMAND = [
    prefixBin('babel'),
    SRC_DIR,
    `--extensions="${EXTENSIONS_WITH_DOT.join(',')}"`,
    '--ignore="**/*.d.ts"',
    `--out-dir="${OUT_DIR}"`,
    '--copy-files',
    '--source-maps=true',
    '--delete-dir-on-start'
  ].join(' ');

  // N.B. This is named 'compile' rather than 'babel' so that NPS' string
  // matching algorithm runs 'build.watch' when the user issues the command
  // 'nps b.w'. Otherwise, NPS would run 'babel.watch'.
  scripts.compile = {
    default: {
      description: 'Compile the project with Babel.',
      script: [
        BABEL_COMMAND,
        '&&',
        // Babel's --ignore argument doesn't work as explained in the docs,
        // especially with multiple patterns. It is easier to just go through
        // the output folder and remove what we don't want.
        prefixBin('del'),
        `"${OUT_DIR}/**/*.spec.*"`,
        `"${OUT_DIR}/**/*.test.*"`
      ].join(' ')
    },
    watch: {
      description: 'Continuously compile the project with Babel.',
      script: `${BABEL_COMMAND} --watch --verbose`
    }
  };


  // ----- TypeScript ----------------------------------------------------------

  scripts.ts = {
    default: {
      description: 'Emit declarations for the project.',
      script: `${prefixBin('ttsc')} --pretty --pretty --emitDeclarationOnly`
    },
    watch: {
      description: 'Continuously type-check and emit declarations for the project.',
      script: `${prefixBin('ttsc')} --pretty --emitDeclarationOnly --watch --preserveWatchOutput`
    },
    check: {
      description: 'Type-check the project without emitting any files.',
      script: `${prefixBin('ttsc')} --pretty --noEmit`
    }
  };


  // ----- Build ---------------------------------------------------------------

  scripts.build = {
    default: {
      description: 'Lint, type-check, and build the project.',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        // Otherwise, run the default prebuild routine.
        userScripts?.scripts?.prebuild ? 'nps prebuild' : undefined,
        // Then, build the project by concurrently running Babel and generating
        // type definitions. N.B. This will implicitly type-check the project.
        npsUtils.concurrent({
          babel: {
            script: scripts.compile.default.script,
            color: 'bgYellow.gray'
          },
          ts: {
            script: scripts.ts.default.script,
            color: 'bgBlue.white'
          }
        }),
        // Finally, if there is a user-defined script named 'postbuild', run it.
        userScripts?.scripts?.postbuild ? 'nps postbuild' : undefined
      ].filter(Boolean))
    },
    watch: {
      description: 'Continuously build the project',
      script: npsUtils.series(...[
        // If there is a user-defined script named 'prebuild', run it.
        userScripts?.scripts?.prebuild ? 'nps prebuild' : undefined,
        npsUtils.concurrent({
          babel: {
            script: scripts.compile.watch.script,
            color: 'bgYellow.gray'
          },
          tsc: {
            script: scripts.ts.watch.script,
            color: 'bgBlue.white'
          }
        })
      ].filter(Boolean))
    }
  };


  // ----- Versioning ----------------------------------------------------------

  scripts.bump = {
    default: {
      description: 'Generates a change log and tagged commit for a release.',
      script: npsUtils.series(...[
        userScripts?.scripts?.prebump ? 'nps prebump' : undefined,
        'nps prepare',
        prefixBin('standard-version'),
        userScripts?.scripts?.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    },
    beta: {
      description: 'Generates a change log and tagged commit for a beta release.',
      script: npsUtils.series(...[
        userScripts?.scripts?.prebump ? 'nps prebump' : undefined,
        'nps prepare',
        `${prefixBin('standard-version')} --prerelease=beta`,
        userScripts?.scripts?.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    },
    first: {
      description: 'Generates a changelog and tagged commit for a project\'s first release.',
      script: npsUtils.series(...[
        userScripts?.scripts?.prebump ? 'nps prebump' : undefined,
        'nps prepare',
        `${prefixBin('standard-version')} --first-release`,
        userScripts?.scripts?.postbump ? 'nps postbump' : undefined
      ].filter(Boolean))
    }
  };


  // ----- Life Cycles ---------------------------------------------------------

  scripts.prepare = {
    description: 'Runs after "npm install" to ensure the package compiles correctly.',
    // This ensures that "nps prepare" will run a user-defined build script if
    // they have set one.
    script: npsUtils.series.nps(
      'lint',
      'build',
      'test.passWithNoTests'
    )
  };


  return merge({
    scripts,
    options: {
      logLevel: 'warn'
    }
  }, userScripts);
};
