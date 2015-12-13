angular.module("homepage").controller("addCtrl", function($scope, todoService){

	$scope.addTask = function(){
		todoService.addTask($scope.newTask).then(function(res){
			$scope.newTask = '';
			console.log("task added")
		});
	}

});