'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .constant('MAX_DEVICE_COUNT', 4)

    .factory('fastAccessModel', ['deviceService', 'MAX_DEVICE_COUNT', function(deviceService, maxDeviceCount, deviceTypeID){
    	return function(){
            var self = this;

            self.deviceService = deviceService;

            self.fastAccessDevices = [];
            self.otherDevices = [];

            self.deviceService.getAll().then(function(devices){
                self.fastAccessDevices = _.filter(devices, function(device){ return device.FastAccess; });
                self.otherDevices = _.filter(devices, function(device){ return !device.FastAccess; });
            });

            self.add = function(device){
                device.FastAccess = true;
                deviceService.update(device).then(function(data){
                    self.fastAccessDevices.push(device);
                    self.otherDevices = _.reject(self.otherDevices, function(otherDevice){
                        return otherDevice.Id == device.Id;
                    });
                });
            }

            self.remove = function(device){
                device.FastAccess = false;
                deviceService.update(device).then(function(data){
                    self.otherDevices.push(device);
                    self.fastAccessDevices = _.reject(self.fastAccessDevices, function(fastAccessDevice){
                        return fastAccessDevice.Id == device.Id;
                    });
                });
            }

            self.canAdd = function(){
                return self.fastAccessDevices.length < maxDeviceCount;
            }
    	}
    }]);
})();
