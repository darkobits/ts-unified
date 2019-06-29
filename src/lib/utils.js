const path = require('path');
const chalk = require('chalk');
const readPkgUp = require('read-pkg-up');
const resolvePkg = require('resolve-pkg');

const log = require('lib/log');


/**
 * Resolves the absolute path to the binary of a given package.
 */
async function resolveBin(pkgName, binName) {
  // Resolve the indicated package relative to this package.
  const pkgPath = resolvePkg(pkgName, {cwd: __dirname});

  if (!pkgPath) {
    throw new Error(`[resolveBin] Unable to resolve path to package "${pkgName}".`);
  }

  // Load the package.json for the indicated package.
  const pkgData = await readPkgUp({cwd: pkgPath});

  if (!pkgData) {
    throw new Error('[resolveBin] Unable to find a package.json for the local project.');
  }

  if (!pkgData.package.bin) {
    throw new Error(`[resolveBin] Package "${pkgName}" does not declare any binaries.`);
  }

  // Using the path to the package's package.json, compute the root directory
  // for the package.
  const pkgRoot = path.parse(pkgData.path).dir;

  // Extract the relative path to the indicated binary.
  const relativeBinPath = binName ? pkgData.package.bin[binName] : pkgData.package.bin[pkgName];

  if (!relativeBinPath) {
    throw new Error(`[resolveBin] Package "${pkgName}" does not have binary "${binName}".`);
  }

  // Return the absolute path to the indicated binary.
  return {
    path: path.resolve(pkgRoot, relativeBinPath),
    version: pkgData.package.version
  };
}


/**
 * Provided a package name and optional binary name, loads the binary.
 */
async function requireBin(pkgName, binName) {
  const binInfo = await resolveBin(pkgName, binName);
  log.verbose('bin', `Using ${chalk.bold(`${binName || pkgName}`)} version ${chalk.green(binInfo.version)}.`);
  require(binInfo.path);
}


module.exports = {
  resolveBin,
  requireBin
};
