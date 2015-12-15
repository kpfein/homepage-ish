var mongoose = require("mongoose");
var User = require("./userModel")

var Task = new mongoose.Schema({
	username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	title: {type: String, required: true},
	details: {type: String},
	status: {type: String, enum: ["active", "completed", "deleted"], default: "active"},
	due: {type: Date},
	progress: [{
		message: {type: String},
		updated: {type: Date, default: Date.now}
	}],
}, {timestamps: true});


module.exports = mongoose.model("Task", Task);