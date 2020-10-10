// code away!
// const express = require('express');
const server = require('./server');

const port = 5000;

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
      message: "Something went wrong. Please try again later."
    })
  })
  
  server.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`)
  })
// TO START UP SERVER: npm run watch