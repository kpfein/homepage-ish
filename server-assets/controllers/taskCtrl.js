var mongoose = require("mongoose");
var Task = require("../models/taskModel");
var User = require("../models/userModel");

module.exports = {

	getActiveTasks: function(req, res){
		// User.findById(req.params.userID).exec().then(function(results){
		// 	res.status(200).send(results);
		// })
		Task.find({user: req.params.userID}).find({status: "active"}).sort({due: 1}).then(function(results){
			res.status(200).send(results);
		});
	},

	getCompletedTasks: function(req, res){
		Task.find({user: req.params.userID}).find({status: "completed"}).sort({updateAt: -1}).then(function(results){
			res.status(200).send(results);
		});
	},

	getTask: function(req, res){
		Task.findById(req.params.id).exec().then(function(results){
			return res.status(200).json(results);
		});
	},

	addTask: function(req, res){
		var task = new Task(req.body);
		task.save().then(function(err, result){
			return res.status(201).end();
		});
	},

	addTasktoUser: function(req, res){
		User.findById(req.params.userID).exec().then(function(user){
		user.todolist.push(req.body);
			return user.save().then(function(results){
				return res.json(results);
			});
		}).catch(function(err) {
      	return res.status(500).json(err);
    	});
	},

	editTask: function(req, res){
		Task.update({_id: req.params.id}, req.body).then(function(err, results){
			console.log(results);
			res.status(200).end();
		});
		// Task.findById(req.params.id).exec().then(function(task){
		// 	task.update(req.body);
		// 	return task.save().then(function(results){
		// 		return res.status(201).end();
		// 	});
		// });
	},

	updateTaskProgress: function(req, res){
		Task.findById(req.params.id).exec().then(function(task){
		task.progress.push(req.body);
			return task.save().then(function(results){
				return res.json(results);
			});
		}).catch(function(err) {
      	return res.status(500).json(err);
    	});
	},

	archiveTask: function(req, res){
		Task.findById(req.params.id).exec().then(function(task){
			task.status = "completed";
			return task.save().then(function(results){
				return res.status(201).end();
			});
		});
	},

	reactivateTask: function(req, res){
		Task.findById(req.params.id).exec().then(function(task){
			task.status = "active";
			return task.save().then(function(results){
				return res.status(201).end();
			});
		});
	},

	deleteTask: function(req, res){
		Task.findById(req.params.id).exec().then(function(task){
			task.status = "deleted";
			return task.save().then(function(results){
				return res.status(201).end();
			})
		})
	},


};


















