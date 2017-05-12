const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const __APP = resolve(__dirname, '../src');
const __DIST = resolve(__dirname, '../dist/app');
const getAbsolutePath = (path) => __APP + '/' + path;
const publicPath = '/app/';

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
    publicPath,
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
                localIdentName: '[hash:base64:5]',
                minimize: true
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      //names: ['vendor', 'manifest']
      names: ['manifest']
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'webpack/template.html',
      googleAnalytics: `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-98729687-1', 'auto');ga('send', 'pageview');</script>`,
      yandexAnalytics: `<script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter44561175 = new Ya.Metrika({ id:44561175, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/44561175" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`,
      captcha: `<script src="https://www.google.com/recaptcha/api.js" async defer></script>`,
      headFolder: '/app'
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      basePath: publicPath,
      writeToFileEmit: true
    })
  ]
};
