'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .directive('timer', function(){
	    return {
	    	restrict: 'E',
	    	scope: {
	    		startTime: '='
	    	},
	    	template: '{{timer.currentTime(startTime).hours}}:{{timer.currentTime(startTime).minutes}}:{{timer.currentTime(startTime).seconds}}',
	    	controller: function($interval){
	    		var offset = 0;

	    		this.currentTime = function(startTime){
	    			var sec_num = offset + startTime;

				    var hours   = Math.floor(sec_num / 3600);
				    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				    var seconds = sec_num - (hours * 3600) - (minutes * 60);

				    if (hours   < 10) {hours   = "0"+hours;}
				    if (minutes < 10) {minutes = "0"+minutes;}
				    if (seconds < 10) {seconds = "0"+seconds;}

				    return {
				    	hours: hours,
				    	minutes: minutes,
				    	seconds: seconds
				    }
	    		}

	    		$interval(function(){
	    			offset += 1;
	    		}, 1000);
	    	},
	    	controllerAs: 'timer'
	    }
    });
})();