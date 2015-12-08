angular.module("todo").controller("dashboardCtrl", function($scope, taskService){

	$scope.showActive = function(){
		taskService.getActiveTasks().then(function(data){
			$scope.actives = data;
			console.log(data);
		});
	}();

	$scope.showCompleted = function(){
		taskService.getCompletedTasks().then(function(data){
			$scope.completeds = data;
		});
	};

});