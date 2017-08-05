import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import compression from 'compression'
import routes from './routes'
import { api as apiLink } from 'constants/urls'
const NODE_ENV = process.env.NODE_ENV;

mongoose.connect('mongodb://localhost:27017/yoap', () => {
  console.log('Connected to mongodb');
});

const app = express();

// middlewares
app.use(compression({level: 3}));
app.use(bodyParser.urlencoded({ type: '*/x-www-form-urlencoded', extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  if (NODE_ENV === 'development') {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://yoap.co");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-AUTH");

  return next();
});
// routes
app.use(apiLink, routes);

export default app;
