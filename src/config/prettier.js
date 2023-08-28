const merge = require('deepmerge');

module.exports = (userConfig = {}) =>
  merge(
    {
      semi: true,
      trailingComma: 'none',
      singleQuote: true,
      printWidth: 80
    },
    userConfig
  );
