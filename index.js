var express = require("express"),
	app = express(),
	port = 9090,
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	http = require("http"),
	taskCtrl = require("./server-assets/controllers/taskCtrl"),
	secret = require("./secret"),
	uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/homepage';

mongoose.Promise = require("q").Promise;

app.use(bodyParser.json(), express.static(__dirname+"/public"));


// TODO ////////////////////////////////////////////////////////////
app.get("/api/tasks/active", taskCtrl.getActiveTasks);
app.get("/api/tasks/completed", taskCtrl.getCompletedTasks);
app.get("/api/task/:id", taskCtrl.getTask);
app.post("/api/tasks", taskCtrl.addTask);
app.put("/api/tasks/:id", taskCtrl.editTask);
app.post("/api/tasks/:id", taskCtrl.updateTaskProgress);
app.put("/api/tasks/:id", taskCtrl.archiveTask);
app.put("/api/tasks/:id", taskCtrl.reactivateTask);
app.delete("/api/tasks/:id", taskCtrl.deleteTask);

// API KEYS ////////////////////////////////////////////////////////////
app.get("/api/nytKey/", function(req, res){ return res.send(secret.nytKey); });
app.get("/api/forecastIOKey", function(req, res){ return res.send(secret.forecastIOKey); })










//Connections
app.listen(process.env.PORT || port, function(){
	console.log("listening on port: ", port);
});

mongoose.connect(uristring);
mongoose.connection.once("open", function(){
	console.log("db connected");
});