'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		.constant('DEVICE_TYPE_ID', 1)

		.constant('SENSOR_TYPE_ID', 2)

    .service('deviceService', ['DEVICE_TYPE_ID', 'SENSOR_TYPE_ID', 'Restangular', '$q', function(deviceTypeId, sensorTypeId, Restangular, $q){
			var dbDevices = Restangular.all('device');

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
							return device.Room.Id == roomId;
						});
						def.resolve(devices);
					});

					return def.promise;
				},
				getSensors: function(){
					var def = $q.defer();

					dbDevices.getList().then(function(devices){
						devices = _.filter(devices, function(device){
							return device.Type.Class.Id == sensorTypeId;
						});
						def.resolve(devices);
					});

					return def.promise;
				},
				getDevices: function(){
					var def = $q.defer();

					dbDevices.getList().then(function(devices){
						devices = _.filter(devices, function(device){
							return device.Type.Class.Id == deviceTypeId;
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
					return dbDevices.all(device.Id).remove();
				},
				isSensor: function(device){
					return device.Type.Class.Id == sensorTypeId;
				},
				isDevice: function(device){
					return device.Type.Class.Id == deviceTypeId;
				},
				hasValue: function(device){
					return device.Type.HasValue;
				},
				canChangeValue: function(device){
          return this.hasValue(device) && this.isDevice(device);
        },
        on: function(device){
        	//send command "on"
        	device.IsOn = true;
        	return this.update(device);
        },
        off: function(device){
        	//send command "off"
        	device.IsOn = false;
        	device.WorkingTime = 0;
        	return this.update(device);
        },
        toggle: function(device){
        	if(device.IsOn){
        		return this.on(device);
        	} else {
        		return this.off(device);
        	}
        },
        setValue: function(device, value){
        	//send command change value
        	device.Value = value;
        	console.log(device);
        	this.update(device);
        }
			}
    }]);
})();