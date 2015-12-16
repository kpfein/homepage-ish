angular.module("homepage").controller("addCtrl", function($scope, todoService, userService, currentUser){

	$scope.currentUser = currentUser;
	$scope.addTask = function(){
		todoService.addTask($scope.newTask, $scope.currentUser).then(function(){
			$scope.newTask = '';
			console.log("task added")
		});
	};


});