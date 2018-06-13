
function runDev() {
  let webpack = require('webpack');
  let webpackMerge = require('webpack-merge');
  let commonConfig = require('./webpack.common.ts');
  let helpers = require('./helper.ts');
  let WebpackShellPlugin = require('./shell-plugin.ts');

  module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
        }
      }),
      new WebpackShellPlugin({
         onBuildEnd: ['npm run build-prod']
      })
    ],
    // output: {
    //   path: helpers.root('build'),
    //   filename: '[name].js'
    // },
    devServer: {
      port: 3000,
      host: 'localhost',
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      proxy: {
        '/api/*': 'http://localhost:8113'
      }
    }
  });
}

runDev();