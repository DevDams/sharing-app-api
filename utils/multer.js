const multer = require('multer')
const path = require('path')

const maxSize = 32505856


const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    cb(null, true)
  },
  limits: { fileSize: maxSize }
}).single('file')

module.exports = upload