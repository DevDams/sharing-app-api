require('dotenv').config()
const mongoose = require('mongoose')

function connectDB() {
	// Database connection
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	const connection = mongoose.connection

	connection.on('open', () => {
		console.log('Database connected')
	})

	connection.on('error', (err) => {
		console.log('Connection failed', err)
	})
}

module.exports = connectDB
