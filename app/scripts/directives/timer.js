'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .directive('timer', ['$interval', 'deviceService', function($interval, deviceService){
	    return {
	    	restrict: 'E',
	    	scope: {
	    		device: '='
	    	},
	    	template: '{{currentTime.hours}}:{{currentTime.minutes}}:{{currentTime.seconds}}',
	    	controller: function($scope){
	    		$scope.currentTime = {
	    			hours: '00',
	    			minutes: '00',
	    			seconds: '00'
	    		};
	    	},
	    	link: function($scope){
	    		var updateTimer = function(){
	    			var sec_num = $scope.device.WorkingTime;

				    var hours   = Math.floor(sec_num / 3600);
				    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				    var seconds = sec_num - (hours * 3600) - (minutes * 60);

				    if (hours   < 10) {hours   = "0"+hours;}
				    if (minutes < 10) {minutes = "0"+minutes;}
				    if (seconds < 10) {seconds = "0"+seconds;}

				    $scope.currentTime = {
		    			hours: hours,
		    			minutes: minutes,
		    			seconds: seconds
		    		};
	    			
	    			//deviceService.updateLocal($scope.device);
		    	}

		    	updateTimer();
	    		$interval(function(){
	    			$scope.device.WorkingTime += 1;
	    			updateTimer();
	    		}, 1000);
	    	},
	    	controllerAs: 'timer'
	    }
    }]);
})();