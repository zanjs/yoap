#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const moduleAlias = require('module-alias');
const NODE_ENV = process.env.NODE_ENV;

// support new syntax
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));
require('babel-register')(babelrc);

// app modes
global.__CLIENT__ = false;
global.__SERVER__ = true;

// module-aliases
moduleAlias.addAliases({
  'models'  : path.join(__dirname, '../server/models'),
  'controllers': path.join(__dirname, '../server/controllers'),
  'utils': path.join(__dirname, '../server/utils'),
  'mail': path.join(__dirname, '../server/mail'),
  'middlewares': path.join(__dirname, '../server/middlewares'),
  'serverConfig': path.join(__dirname, '../server/serverConfig.js'),
  'config': path.join(__dirname, '../src/config'),
  'helpers': path.join(__dirname, '../src/helpers'),
  'constants': path.join(__dirname, '../src/store/constants'),
  'validation': path.join(__dirname, '../src/store/validation'),
});


require(
  NODE_ENV === 'development'
    ? '../server/index'
    : '../server/server'
);
