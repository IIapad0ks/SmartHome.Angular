'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .factory('roomViewModel', ['roomService', 'deviceService', 'deviceTypeService', function(roomService, deviceService, deviceTypeService){
			return function(id){
				this.deviceService = deviceService;

				this.room = roomService.get(id);
				this.devices = deviceService.getByRoomID(this.room.ID);

				this.deleteDevice = function(device){
					deviceService.delete(device);
					this.devices = deviceService.getByRoomID(this.room.ID);
				}

				//ADD DEVICE
				this.newDevice = {};
				this.isAddDevice = false;
				this.deviceTypes = deviceTypeService.getAll();

				this.cancelAddDevice = function(){
					this.newDevice = {};
					this.isAddDevice = false;
				}

				this.startAddDevice = function(){
					this.isAddDevice = true;
				}

				this.addDevice = function(){
					this.newDevice.RoomID = this.room.ID;
					deviceService.add(this.newDevice);
					this.cancelAddDevice();

					this.devices = deviceService.getByRoomID(this.room.ID);
				}
			}
    }]);
})();