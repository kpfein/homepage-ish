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

	todolist: [{
			task: {type: String, ref: "Task"}
	}],

});




module.exports = mongoose.model('User', userSchema);














