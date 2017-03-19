const { createServer } = require('http');
const path = require('path');
const express = require('express');
const __DIST = path.resolve(__dirname, '../dist');

const app = express();
const port = process.env.YOUR_PORT || process.env.PORT || 5000;
//const host = process.env.YOUR_HOST || process.env.HOST || '0.0.0.0';

app.use(express.static(__DIST));

app.get('*', (req, res) => {
  res.sendFile(`${__DIST}/index.html`)
});

const server = createServer(app);

server.listen(port, function(){
  console.log(`Listening on ${port}.`);
});