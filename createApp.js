const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const setupRoutes = require('./startup/routes')
require('./startup/database')()

const createApp = () => {
  const app = express()

  if (process.env.NODE_ENV == 'prod') {
    app.use(helmet())
  }

  app.use(cors())

  setupRoutes(app)

  return app
}

module.exports = createApp
