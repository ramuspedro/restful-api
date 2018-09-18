/**
 * Request handlers
 */

// Dependencies
const _data = require('./data')

// Define the handlers
let handlers = {}

// Users
handlers.users = function (data, callback) {
  const acceptableMethods = ['post', 'get', 'put', 'delete']

  if(acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback)
  } else {
    callback(405)
  }
}

// Container for the users submethods
handlers._users = {}

// Users - post
data._users.post = function (data, callback) {
}

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
data._users.post = function (data, callback) {
  // Check that all the required fields are filled out
  let firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false

  let lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false

  let phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false

  let password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
  
  let tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false

  if(firstName && lastName && phone && password && tosAgreement) {
    // Make sure that the user doesnt already exist
    _data.read('users', phone, function (error, data) {
      if (err) {
        // Hash the password
      } else {
        // User already exist
        callback(400, {
          'Error': 'A user with that phone number already exists'
        })
      }
    })
  } else {
    callback(404, {
      'Error': 'Missing required field'
    })
  }
}

// Users - get
data._users.get = function (data, callback) {}

// Users - put
data._users.put = function (data, callback) {}

// Users - delete
data._users.delete = function (data, callback) {}

// Ping handler
handlers.ping = function (data, callback) {
  callback(200)
}

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404)
}

module.exports = handlers