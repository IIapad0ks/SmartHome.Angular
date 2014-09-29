'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		.constant('DEVICE_TYPE_ID', "5429100f7c8865f0b594ebe4")

		.constant('SENSOR_TYPE_ID', "542910167c8865f0b594ebe5")

    .service('deviceService', ['DEVICE_TYPE_ID', 'SENSOR_TYPE_ID', 'Restangular', '$q', function(deviceTypeId, sensorTypeId, Restangular, $q){
			var dbDevices = Restangular.all('devices');

			return {
				get: function(id){
					return dbDevices.get(id);
				},
				getAll: function(){
					return dbDevices.getList();
				},
				getByRoomId: function(roomId){
					var def = $q.defer();

					dbDevices.getList().then(function(devices){
						devices = _.filter(devices, function(device){
							return device.room._id == roomId;
						});
						def.resolve(devices);
					});

					return def.promise;
				},
				getSensors: function(){
					var def = $q.defer();

					dbDevices.getList().then(function(devices){
						devices = _.filter(devices, function(device){
							return device.type.class._id == sensorTypeId;
						});
						def.resolve(devices);
					});

					return def.promise;
				},
				getDevices: function(){
					var def = $q.defer();

					dbDevices.getList().then(function(devices){
						devices = _.filter(devices, function(device){
							return device.type.class._id == deviceTypeId;
						});
						def.resolve(devices);
					});

					return def.promise;
				},
				add: function(device){
					return dbDevices.post(device);
				},
				update: function(device){
					return dbDevices.customPUT(device);
				},
				remove: function(device){
					return dbDevices.all(device._id).remove();
				},
				isSensor: function(device){
					return device.type.class._id == sensorTypeId;
				},
				isDevice: function(device){
					return device.type.class._id == deviceTypeId;
				},
				hasValue: function(device){
					return device.type.hasValue;
				},
				canChangeValue: function(device){
          return this.hasValue(device) && this.isDevice(device);
        },
        on: function(device){
        	//send command "on"
        	device.isOn = true;
        	return this.update(device);
        },
        off: function(device){
        	//send command "off"
        	device.isOn = false;
        	device.workingTime = 0;
        	return this.update(device);
        },
        toggle: function(device){
        	if(device.isOn){
        		return this.on(device);
        	} else {
        		return this.off(device);
        	}
        },
        setValue: function(device, value){
        	//send command change value
        	device.value = value;
        	console.log(device);
        	this.update(device);
        }
			}
    }]);
})();