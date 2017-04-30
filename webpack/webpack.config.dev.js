const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __APP = resolve(__dirname, '../src');
const __DIST = resolve(__dirname, '../dist/app');

const getAbsolutePath = (path) => __APP + '/' + path;

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint


    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    'gsap/TweenMax.js',
    'gsap/Draggable.js',
    // vendors

    './index.js',
    // the entry point of our app

  ],

  output: {
    filename: 'bundle.js',
    path: __DIST,
    publicPath: '/',
  },

  context: __APP,

  devServer: {
    hot: true,
    contentBase: __DIST,
    publicPath: '/',
    historyApiFallback: true,
  },

  module: {
    rules: [{
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(js|jsx)$/,
        //include: [__APP],
        include: [__APP, resolve(__dirname)],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {

        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          "css-loader?modules&importLoaders=3&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader",
          "sass-loader?outputStyle=expanded&sourceMap",
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          //'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
    modules: [
      __APP,
      'node_modules'
    ],
    alias: {
      components: getAbsolutePath('components'),
      containers: getAbsolutePath('containers'),
      pages: getAbsolutePath('pages'),
      api: getAbsolutePath('api'),

      store: getAbsolutePath('store'),
      stores: getAbsolutePath('store/stores'),
      models: getAbsolutePath('store/models'),
      constants: getAbsolutePath('store/constants'),
      validation: getAbsolutePath('store/validation'),

      data: getAbsolutePath('data'),
      images: getAbsolutePath('data/images'),
      icons: getAbsolutePath('data/icons'),

      helpers: getAbsolutePath('helpers'),
      config: getAbsolutePath('config.js'),
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'yoap',
      template: '../webpack/template.html',
      favicon: '../src/data/images/favicon/favicon.ico'
    }),
  ]
};
