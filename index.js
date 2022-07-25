const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
require('./startup/database')()

const app = express()

if (process.env.NODE_ENV == 'production') {
  app.use(cors())
  app.use(helmet())
}

require('./startup/routes')(app)
app.all('*', (req, res) => res.send('<h1>Error404! Page not found!<h1>'))
app.listen(process.env.PORT || 8000, () => { console.log('Listening on port 5000') })
