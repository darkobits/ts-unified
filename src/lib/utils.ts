import path from 'path';

import chalk from 'chalk';
import readPkgUp from 'read-pkg-up';
import resolvePkg from 'resolve-pkg';

import log from 'lib/log';


/**
 * Resolves the absolute path to the binary of a given package.
 */
export async function resolveBin(pkgName: string, binName?: string) {
  // Resolve the indicated package relative to this package.
  const pkgPath = resolvePkg(pkgName, {cwd: __dirname});

  if (!pkgPath) {
    throw new Error(`[resolveBin] Unable to resolve path to package "${pkgName}".`);
  }

  // Load the package.json for the indicated package.
  const pkgData = await readPkgUp({cwd: pkgPath});

  if (!pkgData.pkg.bin) {
    throw new Error(`[resolveBin] Package "${pkgName}" does not declare any binaries.`);
  }

  // Using the path to the package's package.json, compute the root directory
  // for the package.
  const pkgRoot = path.parse(pkgData.path).dir;

  // Extract the relative path to the indicated binary.
  const relativeBinPath = binName ? pkgData.pkg.bin[binName] : pkgData.pkg.bin[pkgName];

  if (!relativeBinPath) {
    throw new Error(`[resolveBin] Package "${pkgName}" does not have binary "${binName}".`);
  }

  // Return the absolute path to the indicated binary.
  return {
    path: path.resolve(pkgRoot, relativeBinPath),
    version: pkgData.pkg.version
  };
}


/**
 * Provided a package name and optional binary name, loads the binary.
 */
export async function requireBin(pkgName: string, binName?: string) {
  const binInfo = await resolveBin(pkgName, binName);
  log.verbose('bin', `Using ${chalk.bold(`${binName || pkgName}`)} version ${chalk.green(binInfo.version)}.`);
  require(binInfo.path);
}
