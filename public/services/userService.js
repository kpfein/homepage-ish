angular.module("homepage").service("userService", function($http, $q){

	var user;

	this.getCurrentUser = function() {
		var defer = $q.defer();
		if (user) {
			defer.resolve(user);
		}
		else {
			$http({
				method: "GET",
				url: "/api/users/me"
			}).then(function(response) {
				user = response.data;
				defer.resolve(response.data);
			});
		}
		return defer.promise;
	};

	this.logout = function() {
		user = null;
		var defer = $q.defer();
		$http({
				method: "GET",
				url: "/api/auth/logout"
			}).then(function(response) {
				defer.resolve(response.data);
			});
		return defer.promise;
	};


});