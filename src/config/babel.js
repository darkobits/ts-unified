const merge = require('babel-merge');


module.exports = (userConfig = {}) => merge({
  presets: [
    [require.resolve('@babel/preset-env'), {
      targets: {node: '10'}
    }],
    require.resolve('@babel/preset-typescript'),
    require.resolve('@babel/preset-react')
  ],
  plugins: [
    [require.resolve('@babel/plugin-proposal-decorators'), {legacy: true}],
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('babel-plugin-add-module-exports'),
    [require.resolve('babel-plugin-module-resolver'), {
      cwd: 'packagejson',
      root: ['./src'],
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json'
      ]
    }]
  ],
  comments: false
}, userConfig);
