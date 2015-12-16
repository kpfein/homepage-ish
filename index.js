	// NODE MODULES ///
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	http = require("http"),
	session = require("express-session"),
	passport = require("passport"),

	// STRATEGIES ///
	TwitterStrategy = require('passport-twitter').Strategy,

	// OTHER SERVER FILES ///
	taskCtrl = require("./server-assets/controllers/taskCtrl"),
	userCtrl = require("./server-assets/controllers/userCtrl"),
	secret = require("./secret"),
	User = require("./server-assets/models/userModel"),

	// MISCELLANEOUS STUFF ///
	app = express(),
	port = 9999,
	uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/homepage';
	mongoose.Promise = require("q").Promise;

// TWITTER ////////////////////////////////////////////////////////////

passport.use(new TwitterStrategy({
	consumerKey: secret.twitter_consumerKey,
	consumerSecret: secret.twitter_consumerSecret,
	callbackURL: 'http://localhost:9999/api/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
	User.findOne({'twitter.id': profile.id}).exec().then(function(user) {

		if (!user) {
			user = new User({
				twitter: {
					id: profile.id,
					username: profile.username,
					token: token,
					tokenSecret: tokenSecret
				}
			});
			user.save().then(function() {
				done(null, user);
			});
		}
		else {
			if (token !== user.twitter.token || tokenSecret !== user.twitter.tokenSecret) {
				User.update({_id: user._id}, {
					twitter: {
						token: token,
						tokenSecret: tokenSecret
					}
				}).then(function() {
					done(null, user);
				});
			}
			else {
				done(null, user);
			}
		}
	});
}));

// FACEBOOK ////////////////////////////////////////////////////////////

// INSTAGRAM ////////////////////////////////////////////////////////////

// TUMBLR ////////////////////////////////////////////////////////////

// REDDIT ////////////////////////////////////////////////////////////





app.use(express.static(__dirname+"/public"));
app.use(session({
	secret: secret.session,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	next();
};

app.get('/api/users/me', requireAuth, function(req, res) {
	return res.json(req.user);
});

app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/login'
}));

app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.status(200).end();
});







app.use(bodyParser.json());
// TODO ////////////////////////////////////////////////////////////
app.get("/api/tasks/active/:userID", requireAuth, taskCtrl.getActiveTasks);
app.get("/api/tasks/completed/:userID", requireAuth,taskCtrl.getCompletedTasks);
app.get("/api/task/:id", taskCtrl.getTask);
app.post("/api/tasks", requireAuth, taskCtrl.addTask);
app.put("/api/tasks/:userID", requireAuth, taskCtrl.addTasktoUser);
app.put("/api/task/edit/:id", taskCtrl.editTask);
app.post("/api/tasks/:id", requireAuth, taskCtrl.updateTaskProgress);
app.put("/api/task/archive/:id", requireAuth, taskCtrl.archiveTask);
app.put("/api/task/reactivate/:id", requireAuth, taskCtrl.reactivateTask);
app.put("/api/task/delete/:id", requireAuth, taskCtrl.deleteTask);

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