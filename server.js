const express = require('express');
const helmet = require('helmet')
const userRouter = require('./users/userRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {

  const endpoint = req.originalUrl;

  const method = req.method;


  console.log(`${method}, ${endpoint}`);
}

module.exports = server;
