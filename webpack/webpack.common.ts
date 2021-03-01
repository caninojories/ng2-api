function runWebpackCommon() {
  const fs = require('fs');
  const helpers = require('./helper.ts');

  module.exports = {
    entry: {
      index: helpers.root('index.ts'),
    },
    resolve: {
      extensions: ['.ts'],
    },
    target: 'node',
    externals: fs.readdirSync('node_modules').reduce(function (acc: any, mod: any) {
      if (mod === '.bin') {
        return acc;
      }

      acc[mod] = 'commonjs ' + mod;

      return acc;
    }, {}),
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    output: {
      path: helpers.root('build'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          rules: [{ test: /\.ts$/, use: 'ts-loader' }],
        },
      ],
    },
  };
}

runWebpackCommon();
