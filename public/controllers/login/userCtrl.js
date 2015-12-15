angular.module("homepage").controller("userCtrl", function($scope, userService, currentUser){

	console.log("currentUser", currentUser);
	$scope.currentUser = currentUser;

})