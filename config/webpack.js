/**
 * Webpack Configuration
 * (sails.config.webpack)
 *
 */
var webpack = require('webpack');
var path    = require('path');

module.exports.webpack = {

  config: {
    entry: path.resolve(__dirname, '../assets/js/app.js'),
    output: {
      path: path.resolve(__dirname, '../.tmp/public/js'),
      filename: 'bundle.js'
    },
    devtool: 'eval',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },
  watchOptions: {
    aggregateTimeout: 300
  }

};
