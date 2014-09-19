'use strict';

(function(){
	var app = angular.module('smartHomeApp')

	.constant('MAX_DEVICE_COUNT', 4)

    .controller('FastAccessDeviceController', ['FastAccessModel', 'MAX_DEVICE_COUNT', function (FastAccessModel, maxDeviceCount){
        this.fastAccessModel = new FastAccessModel();
	    this.canAdd = this.fastAccessModel.fastAccessDevices.length < maxDeviceCount;

        this.IsValueDevice = function(device){
            return typeof(device.Value) != 'undefined';
        }

        this.addDevice = function(device){
            this.fastAccessModel.add(device);
        }

        this.deleteDevice = function(device){
            this.fastAccessModel.remove(device);
        }
    }])

    .factory('FastAccessModel', ['deviceService', function(deviceService){
    	return function(){
            this.allDevices = [];
            this.fastAccessDevices = [];
            this.otherDevices = [];

            this.fill = function(){
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
            }
            this.fill();

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
