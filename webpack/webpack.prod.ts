function runProd() {
  const helpers = require('./helper.ts');
  const webpack = require('webpack');
  const fs = require('fs');

  module.exports = {
    mode: 'production',
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
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          rules: [{ test: /\.ts$/, use: 'ts-loader' }],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {},
      }),
    ],
  };
}

runProd();
