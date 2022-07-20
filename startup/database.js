const mongoose = require('mongoose')
require('dotenv').config()

module.exports = function () {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch(() => {
      console.log('Failed to connect to database')
      process.exit(1)
    }
    )

  mongoose.connection.on('error', () => {
    console.log('An error has occured in the database...')
    console.log('Trying to reconect...')
  })

  mongoose.connection.on('reconnected', () => {
    console.log('Reconnecting to database...')
    console.log('Closing application...')
    process.exit(1)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Connection lost to database...')
    console.log('Closing application...')
    process.exit(1)
  })
}
