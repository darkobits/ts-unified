require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.es6', '.mjs', '.json']
});


module.exports = require('./src/config/package-scripts')();
