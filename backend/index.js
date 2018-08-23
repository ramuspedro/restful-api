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

  // Get the query string as an object
  let queryStringObject = parsedUrl.query

  // Get http method
  let method = req.method.toLowerCase()

  // Get the headers as an object
  let headers = req.headers

  // Send the response
  res.end('Hello World!\n')
  
  // Log the request path
  console.log("*************");
  console.log("Request is received on path: ", trimmedPath);
  console.log("Method: ", method);
  console.log("Query: ", queryStringObject);
  console.log("Headers: ", headers);
})

// start the server, and have it listen on port 3000
server.listen(8000, () => {
  console.log("The server is listening on 8000");
})