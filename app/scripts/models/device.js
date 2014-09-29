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

					triggerService.getByDeviceId(device._id).then(function(triggers){
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
					self.device.isOn = true;
					deviceRepository.on(self.device);
				}

				self.offDevice = function(){
					self.device.isOn = false;
					deviceRepository.off(self.device);
				}

				self.canTriggerSetValue = function(actionId){
					if(self.actions.length == 0 || typeof(actionId) == 'undefined'){
						return false;
					}

					return _.find(self.actions, function(action){
						return action._id == actionId;
					}).canSetValue;
				}

				self.resetTrigger = function(resetedTrigger){
					triggerService.get(resetedTrigger._id).then(function(dbTrigger){
						self.device.triggers = _.reject(self.device.triggers, function(trigger){
							return trigger._id == resetedTrigger._id;
						});

						self.device.triggers.push(dbTrigger);
					});
				}

				self.deleteTrigger = function(deletedTrigger){
					triggerService.remove(deletedTrigger).then(function(isDeleted){
						self.device.triggers = _.reject(self.device.triggers, function(trigger){
							return trigger._id == deletedTrigger._id;
						});
					});
				}

				//ADD TRIGGER
				var getDefaultTrigger = function(){
					return {
						name: '',
						device: {},
						sensor: {},
						condition: '',
						action: {},
						value: 0
					}
				}

				self.newTrigger = getDefaultTrigger();

				self.cancelAddTrigger = function(){
					self.newTrigger = getDefaultTrigger();
				}

				self.addTrigger = function(){
					if(self.isDevice()){
						self.newTrigger.device = self.device;
						self.newTrigger.sensor = _.find(self.triggerDevices, function(sensor){
							return self.newTrigger.sensor._id == sensor._id;
						});
					}

					if(!self.isDevice()){
						self.newTrigger.sensor = self.device;
						self.newTrigger.device = _.find(self.triggerDevices, function(device){
							return self.newTrigger.device._id == device._id;
						})
					}

					self.newTrigger.action = _.find(self.actions, function(action){
						return self.newTrigger.action._id == action._id;
					});

					triggerService.add(self.newTrigger).then(function(trigger){
						self.device.triggers.push(trigger);
					});

					self.cancelAddTrigger();
				}
			}
    }]);
})();