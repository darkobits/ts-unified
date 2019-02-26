require('@babel/register');

const path = require('path');
const merge = require('deepmerge');
const npsUtils = require('nps-utils');

const {
  SRC_DIR,
  OUT_DIR,
  EXTENSIONS_WITH_DOT
} = require('../etc/constants');


/**
 * If required by our local package-scripts file, returns the provided binary
 * name unmodified. Otherwise, prepends the bin prefix used by this package to
 * ensure that consumers reference our binaries.
 */
function prefixBin (binName) {
  const binPrefix = 'unified';

  if (module.parent.id === path.resolve(__dirname, '..', '..', 'package-scripts.js')) {
    return binName;
  }

  return `${binPrefix}-${binName}`;
}


// ----- Script Definitions ----------------------------------------------------

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
    // script: ''
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

const tsc = `${prefixBin('tsc')} --emitDeclarationOnly --pretty`;
const babel = `${prefixBin('babel')} ${SRC_DIR} --extensions="${EXTENSIONS_WITH_DOT.join(',')}" --ignore="**/*.spec.*,**/*.d.ts" --out-dir="${OUT_DIR}" --copy-files --source-maps=true`;
const postBuild = `${prefixBin('del')} ${OUT_DIR}/**/*.spec.*`;

const build = {
  default: {
    description: 'Build the project.',
    script: npsUtils.series(clean.script, lint.script, tsc, babel, postBuild)
  },
  watch: {
    description: 'Continuously build the project',
    script: npsUtils.series(clean.script, npsUtils.concurrent({
      tsc: `${tsc} --preserveWatchOutput --watch`,
      babel: `${babel} --watch --verbose`
    }))
  }
};

const bump = {
  default: {
    description: 'Generates a change log and tagged commit for a release.',
    script: npsUtils.series(build.default.script, prefixBin('standard-version'))
  },
  beta: {
    description: 'Generates a change log and tagged commit for a beta release.',
    script: npsUtils.series(build.default.script, `${prefixBin('standard-version')} --prerelease=beta`)
  }
};

const prepare = {
  description: 'Runs after "npm install" to ensure the package compiles correctly.',
  script: npsUtils.series(build.default.script, `${test.default.script} --passWithNoTests`)
};


module.exports = (userScripts = {}) => {
  return merge({
    scripts: {
      clean,
      lint,
      test,
      build,
      bump,
      prepare
    }
  }, userScripts);
};
