	// NODE MODULES ///
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	http = require("http"),
	session = require("express-session"),
	passport = require("passport"),

	// STRATEGIES ///
	TwitterStrategy = require('passport-twitter').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	LocalStrategy = require("passport-local").Strategy,

	// OTHER SERVER FILES ///
	taskCtrl = require("./server-assets/controllers/taskCtrl"),
	userCtrl = require("./server-assets/controllers/userCtrl"),
	twitterCtrl = require("./server-assets/controllers/twitterCtrl"),
	secret = require("./secret"),
	User = require("./server-assets/models/userModel"),

	// MISCELLANEOUS STUFF ///
	app = express(),
	port = 9999,
	uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/homepage';
	mongoose.Promise = require("q").Promise;

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(session({
	secret: secret.session,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSION SETUP //////////////////////////////////////////////////////////////////////

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
        done(err, user);
    });
});


// LOCAL ////////////////////////////////////////////////////////////

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
      	return done(err);
      }
      if (!user) { 
      	return done(null, false); 
      }
      user.verifyPassword(password).then(function(result) {
      	if (!result) {
      		return done(null, false); 
      	}
      	return done(null, user);
      });
    });
}));



// TWITTER ////////////////////////////////////////////////////////////

passport.use(new TwitterStrategy({
	consumerKey: secret.twitter_consumerKey,
	consumerSecret: secret.twitter_consumerSecret,
	callbackURL: 'http://localhost:9999/api/auth/twitter/callback',
	passReqToCallback : true
}, function(req, token, tokenSecret, profile, done) {
	process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err){
                    	return done(err);
                    }
                    if (user) {
                        if (!user.twitter.token || !user.twitter.tokenSecret) {
                            user.twitter.token = token;
                            user.twitter.tokenSecret = tokenSecret

                            user.save(function(err) {
                                if (err){
                                	console.log(err);
                                }
                                return done(null, user);
                            });
                        }
                        return done(null, user); 
                    } else {
                        var newUser = new User();

                        newUser.twitter.id = profile.id;
                        newUser.twitter.username = profile.username
                        newUser.twitter.token = token;
                        newUser.twitter.tokenSecret = tokenSecret;

                        newUser.save(function(err) {
                            if (err){
                            	console.log(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user;

                    user.twitter.id = profile.id;
                    user.twitter.username = profile.username
                    user.twitter.token = token;
                    user.twitter.tokenSecret = tokenSecret;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

// FACEBOOK ////////////////////////////////////////////////////////////

passport.use(new FacebookStrategy({

        clientID: secret.facebook_clientID,
        clientSecret: secret.facebook_clientSecret,
        callbackURL: "http://localhost:9999/api/auth/facebook/callback",
        passReqToCallback : true

    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err){
                    	return done(err);
                    }
                    if (user) {
                        if (!user.facebook.token) {
                            user.facebook.token = token;

                            user.save(function(err) {
                                if (err){
                                	console.log(err);
                                }
                                return done(null, user);
                            });
                        }
                        return done(null, user); 
                    } else {
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;

                        newUser.save(function(err) {
                            if (err){
                            	console.log(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user;

                user.facebook.id = profile.id;
                user.facebook.token = token;

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));



// INSTAGRAM ////////////////////////////////////////////////////////////

// TUMBLR ////////////////////////////////////////////////////////////

// REDDIT ////////////////////////////////////////////////////////////






var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	next();
};

app.get('/api/users/me', requireAuth, function(req, res) {
	return res.json(req.user);
});

// LOCAL ////////////////////////////////////////////////////////////

// register
app.post('/api/users', function(req, res) {
	User.findOne({ username: req.body.username }).exec().then(function(user) {
		if (user) {
			return res.status(409).end();
		}
		user = new User({
			username: req.body.username,
			password: req.body.password
		});
		user.save().then(function(err, result) {
			return res.status(201).end();
		});
	});
});

// login
app.post('/api/auth/local', passport.authenticate('local', {
	successRedirect : '#//profile', 
	failureRedirect : '/#/login', 
}));

// TWITTER ////////////////////////////////////////////////////////////

app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/'
}));

app.get('/api/connect/twitter', passport.authorize('twitter'));
app.get('/api/connect/twitter/callback', passport.authorize('twitter', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/'
}));

// FACEBOOK ////////////////////////////////////////////////////////////

app.get('/api/auth/facebook', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/'
}));

app.get('/api/connect/facebook', passport.authorize('facebook'));
app.get('/api/connect/facebook/callback', passport.authorize('facebook', {
	successRedirect: '/#/profile',
	failureRedirect: '/#/'
}));

// LOGOUT ////////////////////////////////////////////////////////////

app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.status(200).end();
});







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

// TWITTER /////////////////////////////////////////////////////////////
app.post("/api/twitter/tweet/:id", requireAuth, twitterCtrl.postTweet);
app.get("/api/twitter/timeline/:id", requireAuth, twitterCtrl.getTimeline);

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