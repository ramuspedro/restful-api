/**
 * Library for storing and editing data
 */

const fs = require('fs')
const path = require('path')

// Container for this module (to be exported)
let lib = {}

// Base directory for the data folder
lib.baseDir = path.join(__dirname, '/../.data/')

// Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      let stringData = JSON.stringify(data)

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false)
            } else {
              callback('Error closing new file')
            }
          })
        } else {
          callback('Error writing to a new file')
        }
      })
    } else {
      callback('Could not create new file, it may already exist')
    }
  })
}

// Read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
    callback(err, data)
  })
}

// Update data inside a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
    if(!err && fileDescriptor) {
      // Convert data to string
      let stringData = JSON.stringify(data)

      // Truncate the file
      fs.truncate(fileDescriptor, function (err) {
        if (!err) {
          // Write to the file and close
          fs.writeFile(fileDescriptor, stringData, function (err) {
            if(!err) {
              fs.close(fileDescriptor, function (err) {
                if(!err) {
                  callback(false)
                } else {
                  callback('Error closing the file')
                }
              })
            } else {
              callback('Error writing to the existing file')
            }
          })          
        } else {
          callback('Error trucating file')
        }
      })
    } else {
      callback("Could not open the file for updating, it may not exist yet.")
    } 
  })
}

// Delete file
lib.delete = function (dir, file, callback) {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
    if(!err) {
      callback(false)
    } else {
      callback("Error deleting")
    }
  })
}

// Export module
module.exports = lib