'use strict';

(function(){
	var app = angular.module('smartHomeApp')

	.constant('MAX_DEVICE_COUNT', 4)

    .controller('fastAccessController', ['fastAccessModel', 'MAX_DEVICE_COUNT', function (fastAccessModel, maxDeviceCount){
        this.fastAccessModel = new fastAccessModel();

	    this.canAdd = function(){
            return this.fastAccessModel.fastAccessDevices.length < maxDeviceCount;
        }

        this.hasValue = function(device){
            return device.Value !== null;
        }

        this.canChangeValue = function(device){
            return this.hasValue(device) && device.Type.Type.ID == 1;
        }

        this.add = function(device){
            this.fastAccessModel.add(device);
        }

        this.remove = function(device){
            this.fastAccessModel.remove(device);
        }
    }])
})();
