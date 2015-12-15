var mongoose = require("mongoose");
var Task = require("./taskModel");


var userSchema = new mongoose.Schema({

	facebook: {

	},

	twitter: {
		id: {type: String},
		username: {type: String},
		token: {type: String},
		tokenSecret: {type: String}
	},

	instagram: {

	},

	tumblr: {

	},

	reddit: {

	},

	todolist: {
		tasks: [{
			task: {type: mongoose.Schema.Types.ObjectId, ref: "Task"}
		}]
	},

});




module.exports = mongoose.model('User', userSchema);














