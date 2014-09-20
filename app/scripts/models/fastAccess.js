'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .factory('fastAccessModel', ['deviceService', function(deviceService){
    	return function(){
            var devices = deviceService.getAll();
            var fastAccessDevices = [];
            var otherDevices = [];
            angular.forEach(devices, function(device){
                if(device.FastAccess){
                    fastAccessDevices.push(device);
                } else {
                    otherDevices.push(device);
                }
            });

            this.allDevices = devices;
            this.fastAccessDevices = fastAccessDevices;
            this.otherDevices = otherDevices;

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

                this.otherDevices.push(device);
                this.fastAccessDevices = _.reject(this.fastAccessDevices, function(item){
                    return item.ID == device.ID;
                })
            }
    	}
    }]);
})();
