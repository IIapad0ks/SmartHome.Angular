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
					deviceRepository.getByRoomId(room._id).then(function(devices){
						self.room.devices = devices;
					});
				});

				self.deleteDevice = function(deletedDevice){
					deviceRepository.remove(deletedDevice).then(function(isDeleted){
						if(isDeleted){
							self.room.devices = _.reject(self.room.devices, function(device){
								return device._id == deletedDevice._id;
							});
						}
					});
				}

				//ADD DEVICE
				var setDefaultDevice = function(){
					return {
						name: '',
						value: 0,
						isOn: false,
						fastAccess: false,
						room: self.room,
						workingTime: 0,
						type: {}
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
					self.newDevice.type = _.find(self.deviceTypes, function(deviceType){
						return self.newDevice.type._id == deviceType._id;
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