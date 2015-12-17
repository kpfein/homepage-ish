angular.module("homepage").service("todoService", function($q, $http){

	this.getActiveTasks = function(currentUser){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/tasks/active/" + currentUser._id,
		}).then(function(result){
			activeTasks = result.data;
			// console.log(activeTasks)
			deferred.resolve(activeTasks);
		});
		return deferred.promise;
	};

	this.getCompletedTasks = function(currentUser){
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/tasks/completed/" + currentUser._id,
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
			// console.log(gotTask)
			deferred.resolve(gotTask);
		});
		return deferred.promise;
	};

	this.addTask = function(newTask, date, currentUser){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url: "/api/tasks",
			data: {
				user: currentUser._id,
				title: newTask.title,
				details: newTask.details,
				due: date
			}
		}).then(function(){
			$http({
				method: "PUT",
				url: "/api/tasks/"+ currentUser._id,
				data: newTask
			}).then(function(){
				// console.log("made it here")
				deferred.resolve();
			});
		});
		return	deferred.promise;
	};

	this.editTask = function(id, thisTask){
		console.log(thisTask)
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/task/edit/" + id,
			data: thisTask
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
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
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/task/archive/" + id,
			data: {
				status: "completed",
			},
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	};

	this.reactivateTask = function(id){
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/task/reactivate/" + id,
			data: {
				status: "active",
			},
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	};

	this.deleteTask = function(id){
		var deferred = $q.defer();
		$http({
			method: "PUT",
			url: "/api/task/delete/" + id,
			data: {
				status: "deleted",
			},
		}).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	};


});







