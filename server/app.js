import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes'
import { api as apiLink } from 'constants/urls'

mongoose.connect('mongodb://localhost:27017/yoap', () => {
  console.log('Connected to mongodb');
})

const app = express()

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// routes
app.use(apiLink, routes);

export default app;
