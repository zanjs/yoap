const app = require('./app');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/webpack.config.server');

const port = process.env.YOUR_PORT || process.env.PORT || 5000;

// Webpack settings
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));
app.use(express.static(compiler.outputPath));
// /Webpack settings

app.get('*', (req, res) => {
  res.sendFile(`${compiler.outputPath}/index.html`)
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});



