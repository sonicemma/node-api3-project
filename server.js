const express = require('express');
const helmet = require('helmet')
const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users', logger, userRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


function logger(req, res, next) {

  const endpoint = req.originalUrl;

  const method = req.method;


  console.log(`${method}, ${endpoint}`);
  next();
}

module.exports = server;
