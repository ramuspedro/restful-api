/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder

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

  // Get the payload, if any
  let decoder = new stringDecoder('utf-8')
  let buffer = ''
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()

    // Send the response
    res.end('Hello World!\n')
    
    // Log the request path
    console.log("*************");
    console.log("Payload: ", buffer);

  })

})

// start the server, and have it listen on port 3000
server.listen(8000, () => {
  console.log("The server is listening on 8000");
})