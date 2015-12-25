var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var q = require("q");
var Task = require("./taskModel");



var userSchema = new mongoose.Schema({

	username: {type: String},
	password: {type: String},
	
	// facebook: {
	// 	id: {type: String},
	// 	token: {type: String}
	// },

	twitter: {
		id: {type: String},
		username: {type: String},
		token: {type: String},
		tokenSecret: {type: String}
	},

	instagram: {
		id: {type: String},
		token: {type: String}
	},

	tumblr: {
		id: {type: String},
		token: {type: String},
		tokenSecret: {type: String}
	},

	reddit: {
		id: {type: String},
		token: {type: String},
		tokenSecret: {type: String}
	},

	todolist: [{
		task: {type: String, ref: "Task"}
	}],

});


userSchema.methods.verifyPassword = function(givenPassword) {
	var dfd = q.defer();
	bcrypt.compare(givenPassword, this.password, function(err, result) {
		if (result) {
			dfd.resolve(true);
		}
		else {
			dfd.reject(false);
		}
	});
	return dfd.promise;
};

userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.genSalt(12, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		})
	});
});



module.exports = mongoose.model('User', userSchema);














