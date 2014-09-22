'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .constant('MAX_DEVICE_COUNT', 4)

    .factory('fastAccessModel', ['deviceService', 'MAX_DEVICE_COUNT', function(deviceService, maxDeviceCount, deviceTypeID){
    	return function(){
            this.deviceService = deviceService;
            this.allDevices = deviceService.getAll();
            this.fastAccessDevices = _.filter(this.allDevices, function(device){ return device.FastAccess; });
            this.otherDevices = _.filter(this.allDevices, function(device){ return !device.FastAccess; });

            this.add = function(device){
                device.FastAccess = true;
                deviceService.update(device);

                this.fastAccessDevices.push(device);
                this.otherDevices = _.reject(this.otherDevices, function(item){
                    return item.ID == device.ID;
                });
            }

            this.remove = function(device){
                device.FastAccess = false;
                deviceService.update(device);

                this.otherDevices.unshift(device);
                this.fastAccessDevices = _.reject(this.fastAccessDevices, function(item){
                    return item.ID == device.ID;
                });
            }

            this.canAdd = function(){
                return this.fastAccessDevices.length < maxDeviceCount;
            }
    	}
    }]);
})();
