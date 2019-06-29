module.exports = require('./src/config/package-scripts')({
  scripts: {
    'postbuild': 'cp-cli src/config dist/config'
  }
});
