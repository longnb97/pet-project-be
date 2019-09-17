require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketController = require('./controllers/socket')

const PORT = process.env.PORT || 3000

// app, socket.io configs
const app = express()

var server = require('http').Server(app)
var io = require('socket.io')(server)

io.on('connection', socketController.onConnect)

const namespace1 = io.of('/nsp1')
namespace1.on('connection', socketController.onNameSpace1Connect)

server.listen(PORT, () => console.log(`Server listening at ${PORT}!`))
app.use(express.static('public'))

// cors configs
app.use(cors())

// body parser configs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/nodejstest', { useNewUrlParser: true }, (err) => {
  if (err) console.log('DB connect Fail!')
  else console.log('DB connect success!')
})

// routes
app.get('/', (req, res) => res.send('nodejs api'))
app.get('/index', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')))
app.use('/api', require('./routes/api'))

// errors handling
app.get('*', function (req, res, next) {
  var error = new Error('404-rip')
  error.status = 404
  next(error)
})

app.use(function (err, req, res, next) {
  res.send(err.message)
})
