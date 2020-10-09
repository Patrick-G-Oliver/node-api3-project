const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

const server = express();

server.use(express.json());

server.use(userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

//custom middleware
// logger was moved to the logger file (surprisingly enough)

// import routers

module.exports = server;