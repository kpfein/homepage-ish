var mongoose = require("mongoose");

var Task = mongoose.model("Task", new mongoose.Schema({
	title: {type: String, required: true},
	details: {type: String},
	due_date: {type: Date},
	status: {type: String, enum: ["active", "completed"], default: "active"},
	progress: []
}));

module.exports = Task;