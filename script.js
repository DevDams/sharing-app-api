const File = require('./models/file.model')
const fs = require('fs')
const connectDB = require('./database/database')

connectDB()

async function fetchData () {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const files = await File.find({ createdAat: { $lt: pastDate } })

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path)
        await file.remove()
        console.log(`successfully deleted ${file.filename}`)
      } catch (error) {
        console.log(`error while deleting file : ${error}`)
      }
    }
    console.log('Job done !')
  }
}

fetchData().then(() => {
  process.exit()
})