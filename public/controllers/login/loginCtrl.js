angular.module("homepage").controller("loginCtrl", function($scope, userService){

	$scope.login = function(){
		userService.login($scope.thisUser).then(function(result){
			console.log("logged in yo!")
		});
	};
});

