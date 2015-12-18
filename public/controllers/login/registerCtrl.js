angular.module("homepage").controller("registerCtrl", function($scope, userService){

	$scope.register = function(){
		userService.register($scope.newUser).then(function(result){
			console.log("registered yo!")
		});
	};
});