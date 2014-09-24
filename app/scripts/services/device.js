'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		.constant('DEVICE_TYPE_ID', 1)

		.constant('SENSOR_TYPE_ID', 2)

    .service('deviceService', ['DEVICE_TYPE_ID', 'SENSOR_TYPE_ID', 'Restangular', function(deviceTypeId, sensorTypeId, Restangular){
			var dbDevices = Restangular.all('device');

			var devices = [];
			var isLoaded = {
				All: false,
				Rooms: [],
				Sensors: false,
				Devices: false
			};
			
			var updateDevice = function(item){
				var isUpdated = false;
				_.each(devices, function(device){
					if(device.Id == item.Id){
						device = item;
						isUpdated = true;
					}
				});

				if(!isUpdated){
					devices.push(item);
				}
			}

			var updateDevices = function(items){
				_.each(items, function(item){
					updateDevice(item);
				});
			}

			return {
				get: function(id){
					item = dbDevices.get(id).$object;
					updateDevice(item);
					return item;
				},
				getAll: function(){
					updateDevices(dbDevices.getList().$object);
					return devices;
				},
				getByRoomID: function(roomID){
					var items = dbDevices.all('room').all(roomID).getList().$object;
					updateDevices(items);
					return items;
				},
				getSensors: function(){
					var items = dbDevices.all('sensor').getList().$object;
					updateDevices(items);
					return items;
				},
				getDevices: function(){
					ivar items = dbDevices.all('device').getList().$object;
					updateDevices(items);
					return items;
				},
				add: function(device){
					//add to db - getting new device - checking
					device = dbDevices.post(device).$object;
					console.log(device);

					updateDevice(device);
					return device;
				},
				update: function(device){
					dbDevices
					updateDevice(device);
					return isUpdated;
				},
				updateLocal: function(device){
					updateDevice(device);
				},
				delete: function(device){
					//delete from db = getting true or false
					var dbIndex = _.indexOf(dbDevices, device);
					if(dbIndex != -1){
						dbDevices.splice(dbIndex, 1);
					}

					var isDeleted = true;

					if(isDeleted){
						var index = _.indexOf(devices, device);
						if(index != -1){
							devices.splice(index, 1);
						}
					}

					return isDeleted;
				},
				isSensor: function(device){
					return device.Type.Type.ID == sensorTypeId;
				},
				isDevice: function(device){
					return device.Type.Type.ID == deviceTypeId;
				},
				hasValue: function(device){
					return device.Value !== null;
				},
				canChangeValue: function(device){
          return this.hasValue(device) && device.Type.Type.ID == deviceTypeId;
        },
        on: function(device){
        	//send command "on"
        	device.IsOn = true;
        	updateDevice(device);
        },
        off: function(device){
        	//send command "off"
        	device.IsOn = false;
        	device.WorkingTime = 0;
        	updateDevice(device);
        },
        toggle: function(device){
        	if(device.IsOn){
        		this.on(device);
        	} else {
        		this.off(device);
        	}
        },
        setValue: function(device, value){
        	//send command change value
        	device.Value = value;
        	updateDevice(device);
        }
			}
    }]);
})();