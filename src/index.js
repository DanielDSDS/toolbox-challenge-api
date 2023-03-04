const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const morgan = require('morgan')
const cors = require('compression')
const compression = require('cors')
const filesRouter = require('./routes/index')

// Startup
const app = express()
dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Register routes
app.use(filesRouter)

const port = process.env.PORT || 5000

if (app.get('env') === 'production') {
  app.use(compression())
  app.use(morgan('common'))
} else {
  app.use(morgan('dev'))
}
const server = http.createServer(app)

server.listen(port, (err) => {
  if (err) throw err
  console.log('Server started at ' + port)
})

module.exports = app
