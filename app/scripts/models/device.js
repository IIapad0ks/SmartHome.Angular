'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .factory('deviceModel', ['deviceService', 'deviceRepository', 'triggerService', 'actionService', function(deviceService, deviceRepository, triggerService, actionService){
			return function(id){
				var self = this;

				self.deviceService = deviceService;
				self.deviceRepository = deviceRepository;
				self.triggerService = triggerService;
				self.actionService = actionService;

				self.device = {
					Type: {
						Name: 'Device',
						HasValue: false,
						Class: {}
					}
				};
				self.device.triggers = [];

				self.actions = [];
				self.triggerDevices = [];

				deviceRepository.get(id).then(function(device){
					self.device = device;

					triggerService.getByDeviceId(device.Id).then(function(triggers){
						self.device.triggers = triggers;
					});

					actionService.getAll().then(function(actions){
						self.actions = actions;
					});

					if(deviceService.isDevice(device)){
						deviceRepository.getSensors().then(function(devices){
							self.triggerDevices = devices;
						});
					}

					if(deviceService.isSensor(device)){
						deviceRepository.getDevices().then(function(devices){
							self.triggerDevices = devices;
						});
					}
				});

				self.isDevice = function(){
					return deviceService.isDevice(self.device);
				}

				self.onDevice = function(){
					self.device.IsOn = true;
					deviceRepository.on(self.device);
				}

				self.offDevice = function(){
					self.device.IsOn = false;
					deviceRepository.off(self.device);
				}

				self.canTriggerSetValue = function(actionId){
					if(self.actions.length == 0 || typeof(actionId) == 'undefined'){
						return false;
					}

					return _.find(self.actions, function(action){
						return action.Id == actionId;
					}).CanSetValue;
				}

				self.resetTrigger = function(resetedTrigger){
					triggerService.get(resetedTrigger.Id).then(function(dbTrigger){
						self.device.triggers = _.reject(self.device.triggers, function(trigger){
							return trigger.Id == resetedTrigger.Id;
						});

						self.device.triggers.push(dbTrigger);
					});
				}

				self.deleteTrigger = function(deletedTrigger){
					triggerService.remove(deletedTrigger).then(function(isDeleted){
						self.device.triggers = _.reject(self.device.triggers, function(trigger){
							return trigger.Id == deletedTrigger.Id;
						});
					});
				}

				//ADD TRIGGER
				var getDefaultTrigger = function(){
					return {
						Id: 0,
						Name: '',
						Device: {},
						Sensor: {},
						Condition: '',
						Action: {},
						SetValue: 0
					}
				}

				self.newTrigger = getDefaultTrigger();

				self.cancelAddTrigger = function(){
					self.newTrigger = getDefaultTrigger();
				}

				self.addTrigger = function(){
					if(self.isDevice()){
						self.newTrigger.Device = self.device;
						self.newTrigger.Sensor = _.find(self.triggerDevices, function(sensor){
							return self.newTrigger.Sensor.Id == sensor.Id;
						});
					}

					if(!self.isDevice()){
						self.newTrigger.Sensor = self.device;
						self.newTrigger.Device = _.find(self.triggerDevices, function(device){
							return self.newTrigger.Device.Id == device.Id;
						})
					}

					self.newTrigger.Action = _.find(self.actions, function(action){
						return self.newTrigger.Action.Id == action.Id;
					});

					triggerService.add(self.newTrigger).then(function(trigger){
						self.device.triggers.push(trigger);
					});

					self.cancelAddTrigger();
				}
			}
    }]);
})();