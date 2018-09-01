/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')
const https = require('https')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder
const config = require('./config')
const fs = require('fs')

// Instatiate the HTTP server
const httpServer = http.createServer((req, res, next) => {
  unifiedServer(req, res)
})

// start the HTTP server, 
httpServer.listen(config.httpPort, () => {
  console.log("The server is listening on " + config.httpPort);
})

// Instatiate the HTTPS server
let httpsServerOptions = {
  'key': fs.readFileSync(__dirname + '/https/key.pem'),
  'cert': fs.readFileSync(__dirname + '/https/cert.pem')
}

const httpsServer = https.createServer(httpsServerOptions, (req, res, next) => {
  unifiedServer(req, res)
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log("The server is listening on " + config.httpsPort);
})

// All the server logic for both the http and https server
let unifiedServer = (req, res) => {
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
    let chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

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
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof (payload) == 'object' ? payload : {}

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload)

      // Return the response
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      // Log the request path
      console.log("*************");
      console.log("Returning this response: ", statusCode, payloadString);
    })
  })
}

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