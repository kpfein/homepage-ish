angular.module("homepage").service("socialService", function($q, $http){

// TWITTER ////////////////////////////////////////////////////
	this.postTweet = function(tweet, currentUser){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url: "/api/twitter/tweet/" + currentUser._id,
			data: {
				status: tweet.status,
			}
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	}

	this.getTimeline = function(currentUser){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/twitter/timeline/" + currentUser._id,
		}).then(function(results){
			var timeline = JSON.parse(results.data.body);
			// console.log(timeline);
			deferred.resolve(timeline);
		});
		return deferred.promise;
	}

// FACEBOOK ////////////////////////////////////////////////////

	this.postStatus = function(status, currentUser){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url: "/graph.facebook.com/" + currentUser.facebook.id + "/feed?message=" + status + "&amp;access_token=" + currentUser.facebook.token,
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	}




});