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
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css?root=' + __dirname + '../assets', 'autoprefixer?browsers=last 2 versions'],
        },
        {
          test: /\.png$/,
          loader: "url?limit=100000"
        },
        {
          test: /\.(jpg|gif)$/,
          loader: "file"
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    }
  },
  watchOptions: {
    aggregateTimeout: 300
  }

};
