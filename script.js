const File = require('./models/file.model')
const connectDB = require('./database/database')

connectDB()

async function fetchData() {
	try {
		const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
		const files = await File.find({ createdAat: { $lt: pastDate } })

		if (files.length) {
			for (const file of files) {
				try {
					// await cloudinary.v2.uploader.destroy(file.public_id, function (err, result) {
					//   console.log('File delete from cloudinary :', result)
					// })
					await file.remove()
					console.log(`successfully deleted ${file.filename}`)
				} catch (error) {
					console.log(`error while deleting file : ${error}`)
				}
			}
			console.log('Job done !')
		}
	} catch (error) {
		console.log(error)
	}
}

fetchData().then(() => {
	process.exit()
})
