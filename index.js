var express = require("express"),
	app = express(),
	port = 9090,
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	taskCtrl = require("./server-assets/controllers/taskCtrl"),
	uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/todo';

mongoose.Promise = require("q").Promise;

app.use(bodyParser.json(), express.static(__dirname+"/public"));



app.get("/api/tasks/active", taskCtrl.getActiveTasks);
app.get("/api/tasks/completed", taskCtrl.getCompletedTasks);
app.post("/api/tasks", taskCtrl.addTask);
app.put("/api/tasks/:id", taskCtrl.updateTask);
app.post("/api/tasks/:id", taskCtrl.updateTaskProgress);
app.delete("/api/tasks/:id", taskCtrl.archiveTask)









//Connections
app.listen(process.env.PORT || port, function(){
	console.log("listening on port: ", port);
});

mongoose.connect(uristring);
mongoose.connection.once("open", function(){
	console.log("db connected");
});