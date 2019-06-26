/**
 * Note: This file must be written in ES5 because is is used in other
 * configuration files prior to transformers being loaded.
 */

/**
 * Directory where source files are located.
 */
exports.SRC_DIR = 'src';


/**
 * Directory where build artifacts will be created.
 */
exports.OUT_DIR = 'dist';


/**
 * List of common file extensions we want tools to work with.
 */
exports.EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'node'];
exports.EXTENSIONS_WITH_DOT = exports.EXTENSIONS.map(ext => `.${ext}`);
