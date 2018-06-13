
function runWebpackCommon() {
  let webpack = require('webpack');
  let fs = require('fs');
  let path = require('path');
  let helpers = require('./helper.ts');

  module.exports = {
    entry: {
      'index': helpers.root('index.ts')
    },
    resolve: {
      extensions: ['.ts']
    },
    target: 'node',
    externals: fs.readdirSync('node_modules')
    .reduce(function(acc, mod) {
      if (mod === '.bin') {
        return acc;
      }

      acc[mod] = 'commonjs ' + mod;

      return acc;
    }, {}),
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    output: {
      path: helpers.root('build'),
      filename: '[name].js',
    },
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      }]
    }
  };
}

runWebpackCommon();