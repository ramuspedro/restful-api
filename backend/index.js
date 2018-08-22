/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')
const url = require('url')

// The server should respond to all the requests with a string
const server = http.createServer((req, res, next) => {
  // Get the URL and parsed
  let parsedUrl = url.parse(req.url, true)
  
  // Get the path
  let path = parsedUrl.pathname
  let trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // Send the response
  res.end('Hello World!\n')
  
  // Log the request path
  console.log("Request is received on path: ", trimmedPath);
})

// start the server, and have it listen on port 3000
server.listen(8000, () => {
  console.log("The server is listening on 8000");
})