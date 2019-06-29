require('ts-node/register');

module.exports = require('./src/config/package-scripts.ts').default({
  scripts: {
    'postbuild': [
      'cp-cli src/config/tsconfig-settings.json dist/config/tsconfig.json',
      'cp-cli src/config/tslint-settings.json dist/config/tslint.json'
    ].join(' && ')
  }
});
