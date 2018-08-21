/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')

// The server should respond to all the requests with a string
const server = http.createServer((req, res, next) => {
  res.end('Hello World!\n')
})

// start the server, and have it listen on port 3000
server.listen(8000, () => {
  console.log("The server is listening on 8000");
})