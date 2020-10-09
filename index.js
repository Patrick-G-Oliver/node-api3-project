// code away!
// const express = require('express');
const server = require('./server');

const port = 4000;

server.use((err, req, res, next) => {
    console.log(err)
    return res.staus(500).json({
      message: "Something went wrong. Please try again later."
    })
  })
  
  server.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`)
  })
