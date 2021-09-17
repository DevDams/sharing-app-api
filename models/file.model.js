const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema(
	{
		filename: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		uuid: {
			type: String,
			required: true,
		},
		cloudinary_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('File', fileSchema)