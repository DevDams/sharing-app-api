const router = require('express').Router()
const uploadMulter = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')
const cloud = require('cloudinary').v2
const File = require('../models/file.model')
const { v4: uuid4 } = require('uuid')

router.post('/', (req, res) => {
  // store file
  try {
    uploadMulter(req, res, async (err) => {
			// Validate data
			if (!req.file) {
				res.json({ error: "Veillez choisir un fichier s'il vous plait" })
			}

			if (err) {
				res.status(500).json({ error: err.message })
			}

			// Upload file to cloudinary
			const cloudUpload = await cloud.uploader.upload(req.file.path, function(
				err,
				result
			) {
				return result
			})

			// store into database
			const file = new File({
				filename: req.file.originalname,
				uuid: uuid4(),
				url: cloudUpload.secure_url,
				size: req.file.size,
			})

			const response = await file.save()

			res.status(200).json({ file: `${response.uuid}` })
		})
  } catch (error) {
		console.log('error :', error)
    next(err)
  }

})

module.exports = router