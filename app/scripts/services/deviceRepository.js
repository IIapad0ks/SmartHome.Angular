'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('deviceRepository', ['deviceService', 'timerService', 'DEVICE_TYPE_ID', 'SENSOR_TYPE_ID', '$q', function(deviceService, timerService, deviceTypeId, sensorTypeId, $q){
    	var devices = [];
    	var deviceDef = $q.defer();

    	deviceService.getAll().then(function(dbDevices){
    		devices = dbDevices;
    		deviceDef.resolve(devices);
    	});

			return {
				get: function(id){
					var def = $q.defer();

					this.getAll().then(function(devices){
						def.resolve(_.find(devices, function(device){
							return device._id == id;
						}));
					});

					return def.promise;
				},
				getAll: function(){
					return deviceDef.promise;
				},
				getByRoomId: function(roomId){
					var def = $q.defer();

					this.getAll().then(function(devices){
						def.resolve(_.filter(devices, function(device){
							return device.room._id == roomId;
						}));
					});

					return def.promise;
				},
				getSensors: function(){
					var def = $q.defer();

					this.getAll().then(function(devices){
						def.resolve(_.filter(devices, function(device){
							return device.type.class._id == sensorTypeId;
						}));
					});

					return def.promise;
				},
				getDevices: function(){
					var def = $q.defer();

					this.getAll().then(function(devices){
						def.resolve(_.filter(devices, function(device){
							return device.type.class._id == deviceTypeId;
						}));
					});

					return def.promise;
				},
				add: function(device){
					var def = $q.defer();

					deviceService.add(device).then(function(d){
						devices.push(d);

						def.resolve(d);

						deviceDef = $q.defer();
						deviceDef.resolve(devices);
					});

					return def.promise;
				},
				update: function(device){
					var def = $q.defer();

					deviceService.update(device).then(function(isUpdated){
						if(isUpdated){
							devices = _.reject(devices, function(d){
								return d._id == device._id;
							});

							devices.push(device);

							deviceDef = $q.defer();
							deviceDef.resolve(devices);
						}

						def.resolve(isUpdated);
					});

					return def.promise;
				},
				remove: function(device){
					var def = $q.defer();

					deviceService.remove(device).then(function(isRemoved){
						if(isRemoved){
							devices = _.reject(devices, function(d){
								return d._id == device._id;
							});

							deviceDef = $q.defer();
							deviceDef.resolve(devices);
						}

						def.resolve(isRemoved);
					});

					return def.promise;
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

        	var def = $q.defer();

        	this.update(device).then(function(isUpdated){
        		if(isUpdated && device.Type.NeedTimeControl){
        			timerService.stopDeviceTimer(device);
        		}

        		def.resolve(isUpdated);
        	});

        	return def.promise;
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
        	return this.update(device);
        }
			}
    }]);
})();