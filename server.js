require('dotenv').config()
const cors = require('cors')
const express = require('express')
const database = require('./database/database')
const addRoute = require('./routes/file')
const showRoute = require('./routes/show')
const downloadRoute = require('./routes/download')
const app = express()

const PORT = process.env.PORT || 8000

// CORS ORIGIN
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
	)
	next()
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/add/file', addRoute)
app.use('/api/files', showRoute)
app.use('/api/files/download', downloadRoute)

database()
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`)
})