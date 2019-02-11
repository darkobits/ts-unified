const merge = require('babel-merge');


const babelConfig = {
  presets: [
    [require.resolve('@babel/preset-env'), {
      targets: {
        node: '10'
      }
    }],
    require.resolve('@babel/preset-typescript')
  ],
  plugins: [
    [require.resolve('@babel/plugin-proposal-decorators'), {legacy: true}],
    require.resolve('@babel/plugin-proposal-class-properties'),
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
};


module.exports = (userConfig = {}) => {
  return merge(babelConfig, userConfig);
};
