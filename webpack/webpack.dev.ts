function runDev() {
  const { merge } = require('webpack-merge');
  const webpack = require('webpack');
  const commonConfig = require('./webpack.common.ts');

  module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {},
      }),
    ],
    devServer: {
      port: 3000,
      host: 'localhost',
      historyApiFallback: true,
      writeToDisk: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
      proxy: {
        '/api/*': 'http://localhost:8113',
      },
    },
  });
}

runDev();
