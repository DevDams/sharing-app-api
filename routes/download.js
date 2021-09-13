const router = require('express').Router()
const File = require('../models/file.model')

router.get('/:uuid', async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid })

  if (!file) {
		return res
			.status(200)
			.json({ message: 'Le lien de téléchargement a expiré' })
	}

  const filePath = `${__dirname}/../${file.path}`
  console.log(filePath)
})




module.exports = router