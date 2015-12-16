angular.module("homepage").controller("editCtrl", function($scope, todoService, $stateParams, currentUser){

	$scope.id = $stateParams.id;
	$scope.currentUser = currentUser;

	$scope.updateTask = function(){
		todoService.editTask($scope.id, $scope.thisTask).then(function(){
		});
		console.log("task updated")
	}


});