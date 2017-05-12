import app from './app'
const { createServer } = require('http');
const path = require('path');

const port = process.env.YOUR_PORT || process.env.PORT || 5000;

const server = createServer(app);

server.listen(port, function(){
  console.log(`Listening on ${port}.`);
});
