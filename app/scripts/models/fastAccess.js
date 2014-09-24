'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .constant('MAX_DEVICE_COUNT', 4)

    .factory('fastAccessModel', ['deviceService', 'MAX_DEVICE_COUNT', function(deviceService, maxDeviceCount, deviceTypeID){
    	return function(){
            this.deviceService = deviceService;

            this.fastAccessDevices = function(){
                return _.filter(deviceService.getAll(), function(device){ return device.FastAccess; });
            }

            this.otherDevices = function(){
                return _.filter(deviceService.getAll(), function(device){ return !device.FastAccess; });
            }

            this.add = function(device){
                device.FastAccess = true;
                deviceService.update(device);
            }

            this.remove = function(device){
                device.FastAccess = false;
                deviceService.update(device);
            }

            this.canAdd = function(){
                return this.fastAccessDevices().length < maxDeviceCount;
            }
    	}
    }]);
})();
