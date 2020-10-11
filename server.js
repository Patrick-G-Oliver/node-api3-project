const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

const server = express();

server.use(express.json());

//custom middleware
server.use(logger);

// import router(s)
server.use(userRouter);
server.use(postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

module.exports = server;