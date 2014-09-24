'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .factory('deviceModel', ['deviceService', 'triggerService', 'actionService', function(deviceService, triggerService, actionService){
			return function(id){
				this.deviceService = deviceService;
				this.triggerService = triggerService;
				this.actionService = actionService;

				this.device = deviceService.get(id);
				this.triggers = triggerService.getByDeviceID(this.device.ID);

				this.resetTrigger = function(trigger){
					var index = _.indexOf(this.triggers, trigger);
					if(index != -1){
						this.triggers[index] = triggerService.get(trigger.ID);
					}
				}

				this.deleteTrigger = function(trigger){
					triggerService.delete(trigger);
				}

				//ADD TRIGGER
				var getDefaultTrigger = function(){
					return {
						Name: null,
						Device: {
							ID: deviceService.isDevice(deviceService.get(id)) ? id : null
						},
						Sensor: {
							ID: deviceService.isSensor(deviceService.get(id)) ? id : null
						},
						Condition: null,
						Action: {
							ID: null
						}
					}
				}

				this.newTrigger = getDefaultTrigger();

				this.addTrigger = function(){
					triggerService.add(this.newTrigger);
					this.newTrigger = getDefaultTrigger();
				}

				this.cancelAddTrigger = function(){
					this.newTrigger = getDefaultTrigger();
				}
			}
    }]);
})();