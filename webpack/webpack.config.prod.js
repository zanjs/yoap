const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: resolve(__dirname, '../src'),
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'redux',
    //   'react-redux',
    //   'redux-thunk',
    //   'react-router',
    //   'react-helmet',
    //   'stackblur-canvas',
    //   'store',
    // ]
    // vendor: [
    //   'react-event-debounce',
    //   'react-redux',
    //   'react-router',
    //   'redux',
    //   'redux-thunk',
    //   'styled-components'
    // ]
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM'
  // },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
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
        loader:  ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: 'css-loader?modules&minimize&importLoaders=3&localIdentName=[hash:base64:5]!postcss-loader!sass-loader'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      //names: ['vendor', 'manifest']
      names: ['manifest']
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      title: 'Ultrastore',
      template: 'webpack/template.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    })
  ]
};
