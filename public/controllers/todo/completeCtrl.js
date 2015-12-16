angular.module("homepage").controller("completeCtrl", function($scope, todoService, currentUser){
	$scope.currentUser = currentUser;

	$scope.getCompletedTasks = function(currentUser){
		todoService.getCompletedTasks($scope.currentUser).then(function(results){
			$scope.completeds = results;
		});
	};

	$scope.getCompletedTasks($scope.currentUser);

	$scope.reactivateTask = function(id){
		todoService.reactivateTask(id).then(function(){
			console.log("task reactivated");
			$scope.getCompletedTasks();
		});
	};

	$scope.deleteTask = function(id){
		todoService.deleteTask(id).then(function(){
			console.log("task removed");
			$scope.getCompletedTasks();
		});
	};

});