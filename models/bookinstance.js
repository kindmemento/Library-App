const mongoose = require('mongoose')
const Schema = mongoose.Schema

const format = require('date-fns/format')

const BookInstanceSchema = new Schema({
	book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
	imprint: { type: String, required: true },
	status: {
		type: String,
		required: true,
		enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
		default: 'Maintenance',
	},
	due_back: { type: Date, default: Date.now },
})

BookInstanceSchema.virtual('due_date').get(function () {
	let due_date = format(this.due_back, 'PPP')
	return due_date
})

BookInstanceSchema.virtual('url').get(function () {
	return '/catalog/bookinstance/' + this._id
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema)
