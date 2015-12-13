var mongoose = require("mongoose");
var Task = require("../models/taskModel");

module.exports = {

	getActiveTasks: function(req, res){
		Task.find({status: "active"}).sort({due: 1}).exec().then(function(results){
			res.status(200).send(results);
		});
	},

	getCompletedTasks: function(req, res){
		Task.find({status: "completed"}).sort().exec().then(function(results){
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
		task.save().then(function(err, results){
			return res.status(201).end();
		});
	},

	editTask: function(req, res){
		Task.update({_id: req.params.id}, req.body).then(function(err, results){
			res.status(200).end();
		});
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
		Task.update({_id: req.params.id}, req.body).then(function(err, res){
			return res.status(201).end();
		});
	},

	reactivateTask: function(req, res){
		Task.update({_id: req.params.id}, req.body).then(function(err, res){
			return res.status(201).end();
		});
	},

	deleteTask: function(req, res){
		Task.remove({_id: req.params.id}).then(function(result){
			res.status(200).end();
		});
	},


};


















