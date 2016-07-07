/**
 * Webpack Configuration
 * (sails.config.webpack)
 *
 */
var webpack = require('webpack');
var path    = require('path');
var debug   = process.env.NODE_ENV === 'development';
var entries = [
  'babel-polyfill',
  path.resolve(__dirname, '../assets/js/app.js') // set your main javascript file
];
var plugins = [
  // prevents the inclusion of duplicate code into your bundle
  new webpack.optimize.DedupePlugin(),
  // expose globally jQuery and angular
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    angular: 'angular'
  })
];

if (debug) {
  // add this entries in order to enable webpack HMR in browser
  entries.push('webpack/hot/dev-server');
  entries.push('webpack-dev-server/client?http://localhost:3000/');

  // HMR plugin
  plugins.push(new webpack.HotModuleReplacementPlugin({
    multiStep: true
  }));
} else {
  // Minify bundle (javascript and css)
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: { comments: false },
    compress: { drop_console: true }
  }));
}

module.exports.webpack = {

  config: { // webpack config  begin here
    entry: entries,
    output: {
      path: path.resolve(__dirname, '../.tmp/public'), // sails.js public path
      filename: 'bundle.js' // or 'bundle-[hash].js'
    },
    devtool: 'eval',
    debug: debug,
    plugins: plugins,
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'eslint', // npm install --save eslint-loader
          exclude: /node_modules/
        },
        {
          test: /.(jpg|jpeg|png|gif|svg)$/, // Minify images using imagemin
          loader: 'image-webpack', // npm install --save image-webpack-loader
          query: {
            bypassOnDebug: true // do not minify when is in development mode
          }
        }
      ],
      loaders: [ // not all are necessary, choose wisely
        {
          test: /\.css$/, // load CSS files
          loaders: [
            'style', // npm install --save style-loader
            'css?root=' + __dirname + '/../assets', // npm install --save css-loader
            'autoprefixer?browsers=last 2 versions' // npm install --save autoprefixer-loader
          ]
        },
        {
          test: /\.scss$/, // load SASS files
          loaders: [
            'style',
            'css',
            'autoprefixer?browsers=last 2 versions',
            'sass?sourceMap' // npm install --save sass-loader node-sass
          ]
        },
        {
          test: /\.png$/, // load PNG using base64 encode
          loader: 'url?limit=100000' // npm install --save url-loader
        },
        {
          test: /\.(jpg|gif)$/, // load image files
          loader: 'file' // npm install --save file-loader
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, // load font files
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, // load TTF font files
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, // load EOT font files
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate?add=true!babel', // npm install --save ng-annotate-loader babel-loader
          exclude: /node_modules/
        },
        {
          test: /.html$/,
          loader: 'ngtemplate?relativeTo=' + __dirname + '/../assets!html?root=' + __dirname + '/../assets' // npm install --save ngtemplate-loader html-loader
        }
      ]
    },
    resolve: {
      root: path.resolve(__dirname, '../assets/'),
    },
    sassLoader: { // config sass-loader
      includePaths: [
        path.resolve(__dirname, '../assets/'),
        // if you want to use compass
        // npm install --save compass-mixins
        path.resolve(__dirname, '../node_modules/compass-mixins/lib')
      ]
    },
    eslint: {
      failOnError: true
    },
    imageWebpackLoader: { // config image-webpack-loader
      optimizationLevel: 6, // imagemin options
      progressive: true,
      interlaced: true,
      use: [require('imagemin-mozjpeg')()],
      pngquant: { // pngquant custom options
        quality: '65-90',
        speed: 4
      },
      svgo: { // svgo custom options
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      }
    }
  },
  development: { // dev server config
    config: { // webpack-dev-server config
      // This is handy if you are using a html5 router.
      historyApiFallback: true,
      // set value port as 3000,
      // open your browser at http://localhost:3000/ instead of http://localhost:1337/
      // for develop and debug your application
      port: 3000,
      // enable Hot Module Replacement with dev-server
      hot: true,
      // sails.js public path
      contentBase: path.resolve(__dirname, '/../.tmp/public'),
      // bypass sails.js server
      proxy: {
        '*': {
          target: 'http://localhost:1337'
        }
      }
    }
  },
  watchOptions: {
    aggregateTimeout: 300
  }

};
