'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .controller('DeviceController', function (){
	    
    })

    .service('deviceService', function(){
			var devices = [{
				ID: 1,
				Name: 'roomConditioner',
				Value: 23,
				IsOn: false,
				FastAccess: true
			},
			{
				ID: 2,
				Name: 'roomLight',
				Value: 35,
				IsOn: true,
				FastAccess: true
			},
			{
				ID: 3,
				Name: 'roomTableLamp',
				IsOn: false,
				FastAccess: false
			},
			{
				ID: 4,
				Name: 'bedLamp',
				IsOn: false,
				FastAccess: false
			}];

			return {
				getAll: function(){
					return devices;
				},
				update: function(updateDevice){
					angular.forEach(devices, function(device, key){
						if(device.ID == updateDevice.ID){
							devices[key] = updateDevice;
						}
					});
				}
			}
    });
})();