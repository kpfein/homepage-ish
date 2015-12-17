angular.module("homepage").service("twitterService", function($q, $http){

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



});