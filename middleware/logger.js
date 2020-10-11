// This custom middleware function logs reuqest method and request url, 
// along with a timestamp, to the console every time a request is made 
// from the server. It is imported in the server.js file so that it will 
// be called when any request is submitted (see server.js: line 11).

function logger(req, res, next) {
    const time = new Date().toISOString()
    console.log(`${req.method} ${req.url} [${time}]`)

    next()
}

module.exports = logger;