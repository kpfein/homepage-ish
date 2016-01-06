var Twitter = require("twitter");
var secret = require("../../secret");
var User = require("../models/userModel");


module.exports = {

	postTweet: function(req, res){
		User.findById(req.params.id).exec().then(function(theUser){
			var user = theUser;
			console.log(user);
			console.log(req.body);
			var client = new Twitter({
				consumer_key: secret.twitter_consumerKey,
			  	consumer_secret: secret.twitter_consumerSecret,
			  	access_token_key: user.twitter.token,
			  	access_token_secret: user.twitter.tokenSecret,
			});
			client.post('statuses/update', req.body,  function(error, tweet, response){
				if(error) {
			  		console.log(error)
				};
			});
		})
	},

	getTimeline: function(req, res){
		User.findById(req.params.id).exec().then(function(theUser){
			var user = theUser;
			console.log(user);
			var client = new Twitter({
				consumer_key: secret.twitter_consumerKey,
			  	consumer_secret: secret.twitter_consumerSecret,
			  	access_token_key: user.twitter.token,
			  	access_token_secret: user.twitter.tokenSecret,
			});
			client.get("statuses/home_timeline", function(error, tweet, response){
				if(error) {
			  		console.log(error)
				};
  				res.json(response);
			});
		});
	},




};