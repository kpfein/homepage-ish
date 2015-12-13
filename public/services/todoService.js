angular.module("homepage").service("todoService", function($q, $http){

	this.getActiveTasks = function(){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/tasks/active",
		}).then(function(result){
			activeTasks = result.data;
			// console.log(activeTasks)
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
			deferred.resolve(completedTasks);
		});
		return deferred.promise;
	};

	this.getTask = function(id){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/task/" + id,
		}).then(function(result){
			gotTask = result.data;
			console.log(gotTask)
			deferred.resolve(gotTask);
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

	this.editTask = function(id, thisTask){
		return $http({
			method: "PUT",
			url: "/api/tasks/" + id,
			data: thisTask
		});
	};

	this.updateTaskProgress = function(id, message){
		return $http({
			method: "POST",
			url: "/api/tasks/" + id,
			data: {
				message: message,
				updated: new Date()
			}
		})
	}

	this.archiveTask = function(id){
		return $http({
			method: "PUT",
			url: "/api/tasks/" + id,
			data: {
				status: "completed"
			}
		});
	};

	this.reactivateTask = function(id){
		return $http({
			method: "PUT",
			url: "/api/tasks/" + id,
			data: {
				status: "active"
			}
		});
	};

	this.deleteTask = function(id){
		return $http({
			method: "DELETE",
			url: "/api/tasks/" + id,
		});
	};

});







