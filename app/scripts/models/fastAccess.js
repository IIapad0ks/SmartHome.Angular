'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .constant('MAX_DEVICE_COUNT', 4)

    .factory('fastAccessModel', ['deviceService', 'deviceRepository', 'MAX_DEVICE_COUNT', function(deviceService, deviceRepository, maxDeviceCount){
    	return function(){
            var self = this;

            self.deviceService = deviceService;
            self.deviceRepository = deviceRepository;

            self.fastAccessDevices = [];
            self.otherDevices = [];

            deviceRepository.getAll().then(function(devices){
                self.fastAccessDevices = _.filter(devices, function(device){ return device.FastAccess; });
                self.otherDevices = _.filter(devices, function(device){ return !device.FastAccess; });
            });

            self.add = function(device){
                device.FastAccess = true;
                deviceRepository.update(device).then(function(isSuccess){
                    if(isSuccess){
                        self.fastAccessDevices.push(device);
                        self.otherDevices = _.reject(self.otherDevices, function(otherDevice){
                            return otherDevice.Id == device.Id;
                        });
                    }
                });
            }

            self.remove = function(device){
                device.FastAccess = false;
                deviceRepository.update(device).then(function(isSuccess){
                    if(isSuccess){
                        self.otherDevices.push(device);
                        self.fastAccessDevices = _.reject(self.fastAccessDevices, function(fastAccessDevice){
                            return fastAccessDevice.Id == device.Id;
                        });
                    }
                });
            }

            self.canAdd = function(){
                return self.fastAccessDevices.length < maxDeviceCount;
            }
    	}
    }]);
})();
