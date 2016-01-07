angular.module("homepage").controller("homeCtrl", function($scope, $stateParams, $sce, newsService, sportsService, weatherService, todoService, socialService, World, National, Politics, Business, Technology, Opinion, Health, Arts, Fashion, Travel, Sports, Weather, currentUser){

	var s = $scope;
	s.world = World;
	s.national = National;
	s.politics = Politics;
	s.business = Business;
	s.technology = Technology;
	s.opinion = Opinion;
	s.health = Health;
	s.arts = Arts;
	s.fashion = Fashion;
	s.travel = Travel;
	s.sports = Sports;
	s.w = Weather;
	s.currentUser = currentUser;
	console.log(s.sports)
	s.Math = Math;


/////// TWITTER ///////////////////////////////////////////////////////////
	s.postTweet = function(tweet, currentUser){
		socialService.postTweet(s.tweet, s.currentUser).then(function(){
		});
			s.tweet.status = '';
			console.log("tweet tweeted")
	};

	s.getTimeline = function(currentUser){
		socialService.getTimeline(s.currentUser).then(function(results){
			s.timeline = results;
			// console.log(s.timeline);
		})	
	}
	s.getTimeline(s.currentUser)

	s.twitterlinks = function (text){
	    var base_url = 'http://twitter.com/';   // identica: 'http://identi.ca/'
	    var hashtag_part = 'search?q=#';        // identica: 'tag/'
	    // convert URLs into links
	    text = text.replace(
	        /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
	        function($0, $1, $2) {
	            return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
	        });
	    // convert protocol-less URLs into links        
	    text = text.replace(
	        /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
	        function($0, $1, $2) {
	            return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
	        });
	    // convert @mentions into follow links
	    text = text.replace(
	        /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
	        function($0, $1, $2, $3) {
	            return ($1 ? $0 : '<a href="' + base_url + $3
	                + '" title="Follow ' + $3 + '" target="_blank">@' + $3
	                + '</a>');
	        });
	    // convert #hashtags into tag search links
	    text = text.replace(
	        /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
	        function($0, $1, $2, $3) {
	            return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3
	                + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3
	                + '</a>');
	        });
	    return text;
	}

	s.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    s.parseTwitterDate = function (text) {
		return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
	}



/////// FACEBOOK ///////////////////////////////////////////////////////////

	// s.postStatus = function(){
	// 	socialService.postStatus(s.status, s.currentUser).then(function(){
	// 		$scope.status = '';
	// 		console.log("status statused")
	// 	});
	// };



/////// WEATHER  /////////////////////////////////
	s.temp = function(temp){return Math.round(temp);}
	s.convertDate = function(dt){return new Date(dt * 1000);}
	s.round = function(x){return Math.round(x);}
	s.celsius = function(a){return Math.round((a - 32) * (5/9));}
	s.percentage = function(x){return Math.round(x * 100);}
	s.kilo = function(z){return (z * 1.69034).toFixed(2);}
	s.kph = function(f){return Math.round(f * 1.69034);}
	s.direction = function(y){
		var x;
		if(((y >= 348.75) && (y < 360)) || ((y <= 11.24) && (y > 0))){ 
			x = "N";
		} else if ((y >= 12.25) && (y <= 33.74)) {
			x = "NNE";
		} else if ((y >= 33.75) && (y <= 56.24)) {
			x = "NE";
		} else if ((y >= 56.25) && (y <= 78.74)) {
			x = "ENE";
		} else if ((y >= 78.75) && (y <= 101.24)) {
			x = "E";
		} else if ((y >= 101.25) && (y <= 123.74)) {
			x = "ESE";
		} else if ((y >= 123.75) && (y <= 146.24)) {
			x = "SE";
		} else if ((y >= 146.25) && (y <= 168.74)) {
			x = "SSE";
		} else if ((y >= 168.75) && (y <= 191.24)) {
			x = "S";
		} else if ((y >= 191.25) && (y <= 213.74)) {
			x = "SSW";
		} else if ((y >= 213.75) && (y <= 236.24)) {
			x = "SW";
		} else if ((y >= 236.25) && (y <= 258.74)) {
			x = "WSW";
		} else if ((y >= 258.75) && (y <= 281.24)) {
			x = "W";
		} else if ((y >= 281.25) && (y <= 303.74)) {
			x = "WNW";
		} else if ((y >= 303.75) && (y <= 326.24)) {
			x = "NW";
		} else if ((y >= 326.25) && (y <= 348.74)) {
			x = "NNW";
		}
		return x;
	};


/////// TO-DO LIST /////////////////////////////////

	s.getActiveTasks = function(currentUser){
		todoService.getActiveTasks(s.currentUser).then(function(results){
			s.actives = results;
			console.log(s.actives[0].due);
		});

	};
	s.getActiveTasks(s.currentUser);

	s.completeTask = function(id){
		todoService.archiveTask(id).then(function(){
			console.log("task archived");
			s.getActiveTasks(s.currentUser);
		});
	};

	s.updateTaskProgress = function(id, thisTask){
		todoService.updateTaskProgress(id, thisTask.progress.message).then(function(){
			s.getActiveTasks(s.currentUser);
			console.log("progress updated");
		});
	};

	s.checkDue = function(dueDate){
		var current = new Date().getTime();
		var due = new Date(dueDate).getTime();
		var check = due - current;
		return check;
		// if(due - current <= 86400000 && due - current >= 0) {
		// 	console.log("task due tomorrow")
		// 	return true
		// } else if (due - current < 0){
		// 	console.log("task past due")
		// 	return false
		// }

	}

});