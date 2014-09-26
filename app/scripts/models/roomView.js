'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .factory('roomViewModel', ['roomService', 'deviceService', 'deviceRepository', 'deviceTypeService', function(roomService, deviceService, deviceRepository, deviceTypeService){
			return function(id){
				var self = this;

				self.deviceService = deviceService;
				self.deviceRepository = deviceRepository;

				self.room = [];
				self.devices = [];

				roomService.get(id).then(function(room){
					self.room = room;
					deviceRepository.getByRoomId(room.Id).then(function(devices){
						self.room.devices = devices;
					});
				});

				self.deleteDevice = function(deletedDevice){
					deviceRepository.remove(deletedDevice).then(function(isDeleted){
						if(isDeleted){
							self.room.devices = _.reject(self.room.devices, function(device){
								return device.Id == deletedDevice.Id;
							});
						}
					});
				}

				//ADD DEVICE
				var setDefaultDevice = function(){
					return {
						Id: 0,
						Name: '',
						Value: 0,
						IsOn: false,
						FastAccess: false,
						Room: self.room,
						WorkingTime: 0,
						Type: {}
					}
				}

				self.newDevice = {};
				self.isAddDevice = false;
				self.deviceTypes = [];

				self.cancelAddDevice = function(){
					self.isAddDevice = false;
				}

				self.startAddDevice = function(){
					self.newDevice = setDefaultDevice();
					deviceTypeService.getAll().then(function(deviceTypes){
						self.deviceTypes = deviceTypes;
					});
					self.isAddDevice = true;
				}

				self.addDevice = function(){
					self.newDevice.Type = _.find(self.deviceTypes, function(deviceType){
						return self.newDevice.Type.Id == deviceType.Id;
					});

					deviceRepository.add(self.newDevice).then(function(device){
						console.log(device);
						self.room.devices.push(device);
					});

					self.cancelAddDevice();
				}
			}
    }]);
})();