const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	age: Number,
	bio: String,

})

module.exports = mongoose.model("person", schema);