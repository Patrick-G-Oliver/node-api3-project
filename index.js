// code away!
// import server to allow for error-handling 
// middleware (see lines 12-17)
const server = require('./server');

// assign a port variable for the server listener (see lines 20-22)
const port = 5000;

// catch all error-handling middleware function
// placed at "bottom" of stack (just before listener)
// to catch any and all errors sent via next(error) calls 
// in request handlers found in the userRouter and postRouter files
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
// (see scripts' "watch" property in package.json)
// 'watch' allows for autoatic restart of server upon file saves.