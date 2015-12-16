angular.module("homepage").controller("activeCtrl", function($scope, todoService, userService, currentUser){

	$scope.currentUser = currentUser;

	$scope.getActiveTasks = function(currentUser){
		todoService.getActiveTasks($scope.currentUser).then(function(results){
			$scope.actives = results;
		});
	};
	$scope.getActiveTasks($scope.currentUser);

	$scope.completeTask = function(id){
		todoService.archiveTask(id).then(function(){
			console.log("task archived");
			$scope.getActiveTasks($scope.currentUser);
		});
	};

	$scope.updateTaskProgress = function(id, thisTask){
		todoService.updateTaskProgress(id, thisTask.progress.message).then(function(){
			$scope.getActiveTasks($scope.currentUser);
			console.log("progress updated");
		});
	};
});
