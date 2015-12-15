var mongoose = require("mongoose");
var User = require("../models/userModel");
var Task = require("../models/taskModel");

module.exports = {

	addUser: function(req, res){
		var user = new User(req.body);
		user.save().then(function(){
			return res.status(201).end();
		});
	},

	

};