angular.module("homepage").service("sportsService", function($http, $q){

	this.getSportsHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/sports.json?api-key=" + nytKey,
			}).then(function(result){
				sports = result.data.results;
				// console.log(sports);
				deferred.resolve(sports);
			});
		});
		return deferred.promise;
	}


});