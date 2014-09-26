'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		.service('timerService', ['$interval', function($interval){
			var deviceTimers = [];

			return {
				addDeviceTimer: function(timerInfo){
					this.stopDeviceTimer(timerInfo.device);

					var timer = $interval(timerInfo.fn, timerInfo.interval);

					deviceTimers.push({
						device: timerInfo.device,
						timer: timer
					});
				},
				stopDeviceTimer: function(device){
	    		var deviceTimer = _.find(deviceTimers, function(deviceTimer){
	    			return deviceTimer.device.Id == device.Id;
	    		});

	    		if(!angular.isDefined(deviceTimer)){
	    			return;
	    		}

	    		$interval.cancel(deviceTimer.timer);

	    		deviceTimers = _.reject(deviceTimers, function(deviceTimer){
	    			return deviceTimer.device.Id == device.Id;
	    		});
	    	}
			}
		}])

    .directive('timer', ['$interval', 'deviceService', 'timerService', function($interval, deviceService, timerService){
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

	    		timerService.addDeviceTimer({
	    			device: $scope.device,
	    			interval: 1000,
	    			fn: function(){
		    			$scope.device.WorkingTime += 1;
		    			updateTimer();
		    		}
	    		});
	    	},
	    	controllerAs: 'timer'
	    }
    }]);
})();