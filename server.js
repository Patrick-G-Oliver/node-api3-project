// node import syntax akin to <import postRouter from "./posts/postRouter> in React"
const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

// allows server to use express
const server = express();

// allows server to parse json strings
server.use(express.json());

//custom middleware
server.use(logger);

// import router(s)
server.use(userRouter);
server.use(postRouter);

// welcome message in HTML
// (for demonstrative purposes)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

// file export (akin to <export default server> in React)
module.exports = server;