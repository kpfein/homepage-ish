angular.module("todo").service("taskService", function($q, $http){

	this.getActiveTasks = function(){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/tasks/active",
		}).then(function(result){
			activeTasks = result.data;
			console.log(activeTasks)
			deferred.resolve(activeTasks);
		});
		return deferred.promise;
	};

	this.getCompletedTasks = function(){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/tasks/completed",
		}).then(function(result){
			completedTasks = result.data;
			deferred.resolve = completedTasks;
		});
		return deferred.promise;
	};

	this.addTask = function(newTask){
		return $http({
			method: "POST",
			url: "/api/tasks",
			data: newTask
		});
	};

	this.updateTask = function(id, selectedTask){
		return $http({
			method: "PUT",
			url: "/api/tasks" + id,
			data: selectedTask
		});
	};

	this.archiveTask = function(id){
		return $http({
			method: "DELETE",
			url: "/api/tasks" + id,
		});
	};

});