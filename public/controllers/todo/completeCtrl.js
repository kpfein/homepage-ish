angular.module("homepage").controller("completeCtrl", function($scope, todoService){

	$scope.getCompletedTasks = function(){
		todoService.getCompletedTasks().then(function(results){
			$scope.completeds = results;
		});
	};

	$scope.getCompletedTasks();

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