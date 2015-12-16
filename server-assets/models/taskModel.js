var mongoose = require("mongoose");
var User = require("./userModel");

var Task = new mongoose.Schema({
	user: {type: String, ref: "User"},
	title: {type: String, require: true},
	details: {type: String},
	status: {type: String, enum: ["active", "completed", "deleted"], default: "active"},
	due: {type: Date},
	progress: [{
		message: {type: String},
		updated: {type: Date, default: Date.now}
	}],
}, {timestamps: true});


module.exports = mongoose.model("Task", Task);