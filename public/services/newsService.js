angular.module("homepage").service("newsService", function($http, $q){

	this.getWorldNewsHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/world.json?api-key=" + nytKey,
			}).then(function(result){
				world = result.data.results;
				// console.log(world);
				deferred.resolve(world);
			});
		});
		return deferred.promise;
	};

	this.getNationalNewsHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/national.json?api-key=" + nytKey,
			}).then(function(result){
				national = result.data.results;
				// console.log(national);
				deferred.resolve(national);
			});
		});
		return deferred.promise;
	};

	this.getPoliticsHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/politics.json?api-key=" + nytKey,
			}).then(function(result){
				politics = result.data.results;
				// console.log(politics);
				deferred.resolve(politics);
			});
		});
		return deferred.promise;
	};

	this.getBusinessHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/business.json?api-key=" + nytKey,
			}).then(function(result){
				business = result.data.results;
				// console.log(business);
				deferred.resolve(business);
			});
		});
		return deferred.promise;
	};

	this.getTechnologyHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/technology.json?api-key=" + nytKey,
			}).then(function(result){
				technology = result.data.results;
				// console.log(technology);
				deferred.resolve(technology);
			});
		});
		return deferred.promise;
	};

	this.getOpinionHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/opinion.json?api-key=" + nytKey,
			}).then(function(result){
				science = result.data.results;
				// console.log(science);
				deferred.resolve(science);
			});
		});
		return deferred.promise;
	};

	this.getHealthHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/health.json?api-key=" + nytKey,
			}).then(function(result){
				health = result.data.results;
				// console.log(health);
				deferred.resolve(health);
			});
		});
		return deferred.promise;
	};

	this.getArtsHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/arts.json?api-key=" + nytKey,
			}).then(function(result){
				arts = result.data.results;
				// console.log(arts);
				deferred.resolve(arts);
			});
		});
		return deferred.promise;
	};

	this.getFashionHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/fashion.json?api-key=" + nytKey,
			}).then(function(result){
				fashion = result.data.results;
				// console.log(fashion);
				deferred.resolve(fashion);
			});
		});
		return deferred.promise;
	};

	this.getTravelHeadlines = function(){
		var deferred = $q.defer();
		var nytKey;
		$http({
			method: "GET",
			url: "/api/nytKey",
		}).then(function(result){
			nytKey = result.data;
			$http({
				method: "GET",
				url: "http://api.nytimes.com/svc/topstories/v1/travel.json?api-key=" + nytKey,
			}).then(function(result){
				travel = result.data.results;
				// console.log(travel);
				deferred.resolve(travel);
			});
		});
		return deferred.promise;
	};


});


