angular.module("todo", ["ui.router"]).config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/dashboard");

	$stateProvider
		// .state("login", {
		// 	url: "/login", 
		// 	controller: "loginCtrl",
		// 	templateUrl: "templates/login.html",
		// })
		// .state("register", {
		// 	url: "/register", 
		// 	controller: "registerCtrl",
		// 	templateUrl: "templates/register.html",
		// })
		.state("dashboard", {
			url: "/dashboard",
			controller: "dashboardCtrl",
			templateUrl: "templates/dashboard.html",
		})
		.state("dashboard.active", {
			url: "/active",
			controller: "activeCtrl",
			templateUrl: "templates/active.html",
		})
		.state("dashboard.add", {
			url: "/add",
			controller: "addCtrl",
			templateUrl: "templates/add.html",
		})
		.state("dashboard.edit", {
			url: "/edit",
			controller: "editCtrl",
			templateUrl: "templates/edit.html",
		})
		.state("dashboard.complete", {
			url: "/complete",
			controller: "completeCtrl",
			templateUrl: "templates/complete.html",
		})
});