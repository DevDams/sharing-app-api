const router = require('express').Router()
const File = require('../models/file.model')

router.get('/:uuid', async (req, res) => {
	try {
		const file = await File.findOne({ uuid: req.params.uuid })
		if (!file) {
			return res
				.status(200)
				.json({ message: 'Le lien de téléchargement a expiré' })
		}
		return res
			.status(200)
			.json({
				uuid: file.uuid,
				fileName: file.filename,
				fileSize: file.size,
				downloadLink: file.url,
			})
	} catch (error) {
		return res.status(500).json({ error: error })
	}
})

module.exports = router
