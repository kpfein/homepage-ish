angular.module("homepage").controller("editCtrl", function($scope, todoService, $stateParams){

	$scope.id = $stateParams.id;

	$scope.updateTask = function(){
		todoService.editTask($scope.id, $scope.thisTask).then(function(){
		});
		console.log("task updated")
	}


});