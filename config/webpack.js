/**
 * Webpack Configuration
 * (sails.config.webpack)
 *
 */
var webpack = require('webpack');
var path    = require('path');

module.exports.webpack = {

  config: {
    entry: [
      'babel-polyfill',
      path.resolve(__dirname, '../assets/js/app.js')
    ],
    output: {
      path: path.resolve(__dirname, '../.tmp/public/js'),
      filename: 'bundle.js'
    },
    devtool: 'eval',
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ],
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'style',
            'css?root=' + __dirname + '../assets',
            'autoprefixer?browsers=last 2 versions'
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style', 'css',
            'autoprefixer-loader?browsers=last 2 versions',
            'sass?sourceMap'
          ],
        },
        {
          test: /\.png$/,
          loader: 'url?limit=100000'
        },
        {
          test: /\.(jpg|gif)$/,
          loader: 'file'
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
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      root: path.resolve(__dirname, '../assets/'),
    },
    sassLoader: {
      includePaths: [
        path.resolve(__dirname, '../assets/'),
        path.resolve(__dirname, '../node_modules/compass-mixins/lib')
      ]
    },
    eslint: {
      failOnError: true
    }
  },
  watchOptions: {
    aggregateTimeout: 300
  }

};
