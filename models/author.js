const mongoose = require('mongoose')
const Schema = mongoose.Schema

const format = require('date-fns/format')

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLenght: 100 },
	family_name: { type: String, required: true, maxlength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date }
})

AuthorSchema.virtual('name').get(function () {
	return `${this.family_name}, ${this.first_name}`
})

AuthorSchema.virtual('lifespan').get(function () {
	let lifetime_string = ''
	if (this.date_of_birth) {
		lifetime_string = format(this.date_of_birth, 'PPP')
	}
	lifetime_string += ' — '
	if (this.date_of_death) {
		lifetime_string += format(this.date_of_death, 'PPP')
	}
	return lifetime_string
})

AuthorSchema.virtual('url').get(function () {
	return '/catalog/author/' + this._id
})

module.exports = mongoose.model('Author', AuthorSchema)
