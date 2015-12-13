angular.module("homepage").controller("activeCtrl", function($scope, todoService){

	$scope.getActiveTasks = function(){
		todoService.getActiveTasks().then(function(results){
			$scope.actives = results;
		});
	};
	$scope.getActiveTasks();

	$scope.completeTask = function(id){
		todoService.archiveTask(id).then(function(){
			console.log("task archived");
			$scope.getActiveTasks();
		});
	};

	$scope.updateTaskProgress = function(id, thisTask){
		todoService.updateTaskProgress(id, thisTask.progress.message).then(function(){
			$scope.getActiveTasks();
			console.log("progress updated");
		});
	};
});
