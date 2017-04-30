const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __APP = resolve(__dirname, '../src');
const __DIST = resolve(__dirname, '../dist/app');
const getAbsolutePath = (path) => __APP + '/' + path;

module.exports = {
  entry: {
    main: [
      'gsap/TweenMax.js',
      'gsap/Draggable.js',
      `${__APP}/index.js`
    ],
  },
  output: {
    path: __DIST,
    filename: '[name].[chunkhash].js',
    publicPath: '/app/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src')],
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use:  ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader',
            'sass-loader'
          ]

          // [
          //   'css-loader?modules&minimize&importLoaders=3&localIdentName=[hash:base64:5]!postcss-loader!sass-loader'
          // ]
          // NODE_ENV === 'development' ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]'
        })
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          //'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      //names: ['vendor', 'manifest']
      names: ['manifest']
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      title: 'yoap',
      template: 'webpack/template.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    })
  ]
};
