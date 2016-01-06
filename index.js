	// NODE MODULES ///
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	http = require("http"),
	session = require("express-session"),
	passport = require("passport"),
	crypto = require("crypto"),

	// STRATEGIES ///
	TwitterStrategy = require('passport-twitter').Strategy,
	// FacebookStrategy = require('passport-facebook').Strategy,
	// InstagramStrategy = require("passport-instagram").Strategy,
	// TumblrStrategy = require("passport-tumblr").Strategy,
	// RedditStrategy = require("passport-reddit").Strategy,


	// OTHER SERVER FILES ///
	taskCtrl = require("./server-assets/controllers/taskCtrl"),
	userCtrl = require("./server-assets/controllers/userCtrl"),
	socialCtrl = require("./server-assets/controllers/socialCtrl"),
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

// passport.use(new FacebookStrategy({

//         clientID: secret.facebook_clientID,
//         clientSecret: secret.facebook_clientSecret,
//         callbackURL: "http://localhost:9999/api/auth/facebook/callback",
//         passReqToCallback : true

//     },
//     function(req, token, refreshToken, profile, done) {
//         process.nextTick(function() {
//             if (!req.user) {
//                 User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
//                     if (err){
//                     	return done(err);
//                     }
//                     if (user) {
//                         if (!user.facebook.token) {
//                             user.facebook.token = token;

//                             user.save(function(err) {
//                                 if (err){
//                                 	console.log(err);
//                                 }
//                                 return done(null, user);
//                             });
//                         }
//                         return done(null, user); 
//                     } else {
//                         var newUser = new User();

//                         newUser.facebook.id = profile.id;
//                         newUser.facebook.token = token;

//                         newUser.save(function(err) {
//                             if (err){
//                             	console.log(err);
//                             }
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             } else {
//                 var user = req.user;

//                 user.facebook.id = profile.id;
//                 user.facebook.token = token;

//                 user.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//         });
//     }));



// INSTAGRAM ////////////////////////////////////////////////////////////

// passport.use(new InstagramStrategy({
// 	clientID: secret.instagram_clientID,
// 	clientSecret: secret.instagram_clientSecret,
// 	callbackURL: 'http://localhost:9999/api/auth/instagram/callback',
// 	passReqToCallback : true
// }, function(req, token, tokenSecret, profile, done) {
// 	process.nextTick(function() {
//             if (!req.user) {
//                 User.findOne({ 'instagram.id' : profile.id }, function(err, user) {
//                     if (err){
//                     	return done(err);
//                     }
//                     if (user) {
//                         if (!user.instagram.token) {
//                             user.instagram.token = token;

//                             user.save(function(err) {
//                                 if (err){
//                                 	console.log(err);
//                                 }
//                                 return done(null, user);
//                             });
//                         }
//                         return done(null, user); 
//                     } else {
//                         var newUser = new User();

//                         newUser.instagram.id = profile.id;
//                         newUser.instagram.token = token;

//                         newUser.save(function(err) {
//                             if (err){
//                             	console.log(err);
//                             }
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             } else {
//                 var user = req.user;

//                     user.instagram.id = profile.id;
//                     user.instagram.token = token;

//                 user.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//         });
//     }));

// TUMBLR ////////////////////////////////////////////////////////////

// passport.use(new TumblrStrategy({
// 	consumerKey: secret.tumblr_consumerKey,
// 	consumerSecret: secret.tumblr_consumerSecret,
// 	callbackURL: 'http://localhost:9999/api/auth/tumblr/callback',
// 	passReqToCallback : true
// }, function(req, token, tokenSecret, profile, done) {
// 	process.nextTick(function() {
//             if (!req.user) {
//                 User.findOne({ 'tumblr.id' : profile.id }, function(err, user) {
//                     if (err){
//                     	return done(err);
//                     }
//                     if (user) {
//                         if (!user.tumblr.token || !user.tumblr.tokenSecret) {
//                             user.tumblr.token = token;
//                             user.tumblr.tokenSecret = tokenSecret

//                             user.save(function(err) {
//                                 if (err){
//                                 	console.log(err);
//                                 }
//                                 return done(null, user);
//                             });
//                         }
//                         return done(null, user); 
//                     } else {
//                         var newUser = new User();

//                         newUser.tumblr.id = profile.id;
//                         newUser.tumblr.token = token;
//                         newUser.tumblr.tokenSecret = tokenSecret;

//                         newUser.save(function(err) {
//                             if (err){
//                             	console.log(err);
//                             }
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             } else {
//                 var user = req.user;

//                     user.tumblr.id = profile.id;
//                     user.tumblr.token = token;
//                     user.tumblr.tokenSecret = tokenSecret;

//                 user.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//         });
//     }));

// REDDIT ////////////////////////////////////////////////////////////

// passport.use(new RedditStrategy({
// 	clientID: secret.reddit_clientID,
// 	clientSecret: secret.reddit_clientSecret,
// 	callbackURL: 'http://localhost:9999/api/auth/reddit/callback',
// 	passReqToCallback : true
// }, function(req, token, tokenSecret, profile, done) {
// 	process.nextTick(function() {
//             if (!req.user) {
//                 User.findOne({ 'reddit.id' : profile.id }, function(err, user) {
//                     if (err){
//                     	return done(err);
//                     }
//                     if (user) {
//                         if (!user.reddit.token) {
//                             user.reddit.token = token;

//                             user.save(function(err) {
//                                 if (err){
//                                 	console.log(err);
//                                 }
//                                 return done(null, user);
//                             });
//                         }
//                         return done(null, user); 
//                     } else {
//                         var newUser = new User();

//                         newUser.reddit.id = profile.id;
//                         newUser.reddit.token = token;

//                         newUser.save(function(err) {
//                             if (err){
//                             	console.log(err);
//                             }
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             } else {
//                 var user = req.user;

//                     user.reddit.id = profile.id;
//                     user.reddit.token = token;

//                 user.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//         });
//     }));





var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	next();
};

app.get('/api/users/me', requireAuth, function(req, res) {
	return res.json(req.user);
});

// TWITTER ////////////////////////////////////////////////////////////

app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/#/home/dashboard',
	failureRedirect: '/#/'
}));

// app.get('/api/connect/twitter', passport.authorize('twitter'));
// app.get('/api/connect/twitter/callback', passport.authorize('twitter', {
// 	successRedirect: '/#/home/dashboard',
// 	failureRedirect: '/#/'
// }));

// FACEBOOK ////////////////////////////////////////////////////////////

// app.get('/api/auth/facebook', passport.authenticate('facebook'));
// app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// app.get('/api/connect/facebook', passport.authorize('facebook'));
// app.get('/api/connect/facebook/callback', passport.authorize('facebook', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// INSTAGRAM ////////////////////////////////////////////////////////////

// app.get('/api/auth/instagram', passport.authenticate('instagram'));
// app.get('/api/auth/instagram/callback', passport.authenticate('instagram', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// app.get('/api/connect/instagram', passport.authorize('instagram'));
// app.get('/api/connect/instagram/callback', passport.authorize('instagram', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// TUMBLR ////////////////////////////////////////////////////////////

// app.get('/api/auth/tumblr', passport.authenticate('tumblr'));
// app.get('/api/auth/tumblr/callback', passport.authenticate('tumblr', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// app.get('/api/connect/tumblr', passport.authorize('tumblr'));
// app.get('/api/connect/tumblr/callback', passport.authorize('tumblr', {
// 	successRedirect: '/#/profile',
// 	failureRedirect: '/#/'
// }));

// REDDIT ////////////////////////////////////////////////////////////

// app.get('/api/auth/reddit', function(req, res, next){
//   req.session.state = crypto.randomBytes(32).toString('hex');
//   passport.authenticate('reddit', {
//     state: req.session.state,
//     duration: 'permanent',
//   })(req, res, next);
// });
// app.get('/api/auth/reddit/callback', function(req, res, next){
//   if (req.query.state === req.session.state){
//     passport.authenticate('reddit', {
//       successRedirect: '/#/profile',
//       failureRedirect: '/'
//     })(req, res, next);
//   }
//   else {
//     next( new Error(403) );
//   }
// });

// app.get('/api/connect/reddit', function(req, res, next){
//   req.session.state = crypto.randomBytes(32).toString('hex');
//   passport.authenticate('reddit', {
//     state: req.session.state,
//     duration: 'permanent',
//   })(req, res, next);
// });

// app.get('/api/connect/reddit/callback', function(req, res, next){
//   if (req.query.state === req.session.state){
//     passport.authenticate('reddit', {
//       successRedirect: '/#/profile',
//       failureRedirect: '/'
//     })(req, res, next);
//   }
//   else {
//     next( new Error(403) );
//   }
// });



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
app.post("/api/twitter/tweet/:id", requireAuth, socialCtrl.postTweet);
app.get("/api/twitter/timeline/:id", requireAuth, socialCtrl.getTimeline);


// API KEYS ////////////////////////////////////////////////////////////
app.get("/api/nytKey/", function(req, res){ return res.send(secret.nytKey); });
app.get("/api/forecastIOKey", function(req, res){ return res.send(secret.forecastIOKey); })
app.get("/api/openKey", function(req, res){ return res.send(secret.openKey); })


//Connections
app.listen(process.env.PORT || port, function(){
	console.log("listening on port: ", port);
});

mongoose.connect(uristring);
mongoose.connection.once("open", function(){
	console.log("db connected");
});