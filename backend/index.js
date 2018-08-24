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

    // Choose the handler this request should go to. If one is not found, use the notFound handler
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    // Construct the data object to send to the handler
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    }

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code called by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {}

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload)

      // Return the response
      res.writeHead(statusCode)
      res.end(payloadString)
      // Log the request path
      console.log("*************");
      console.log("Returning this response: ", statusCode, payloadString);
    })
  })

})

// start the server, and have it listen on port 3000
server.listen(8000, () => {
  console.log("The server is listening on 8000");
})

// Define the handlers
let handlers = {}

// sample handler
handlers.sample = (data, callback) => {
  // Callback a http status code, and a payload object
  callback(200, {
    'name': 'sample handler'
  })
}

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404)
}

// Define a request router
let router = {
  'sample': handlers.sample
}