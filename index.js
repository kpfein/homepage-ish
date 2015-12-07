var express = require("express"),
	app = express(),
	port = 9090,
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/todo';

mongoose.Promise = require("q").Promise;

app.use(bodyParser.json(), express.static(__dirname+"/public"));



app.listen(process.env.PORT || port, function(){
	console.log("listening on port: ", port);
});

mongoose.connect(uristring);
mongoose.connection.once("open", function(){
	console.log("db connected");
});