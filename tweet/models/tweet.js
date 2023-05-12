const mongoose = require("mongoose");

const schema = mongoose.Schema({
	description: String,
	person: mongoose.Schema.Types.ObjectId,
	bio: String,

})

module.exports = mongoose.model("tweet", schema);