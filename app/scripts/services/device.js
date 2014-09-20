'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('deviceService', function(){
			var devices = [{
				ID: 1,
				Name: 'roomConditioner',
				Value: 23,
				IsOn: false,
				FastAccess: true,
				RoomID: 1,
				Type: {
					ID: 1,
					Name: 'Conditioner',
					Type: {
						ID: 1,
						Name: 'Device'
					}
				}
			},
			{
				ID: 2,
				Name: 'roomLight',
				Value: 35,
				IsOn: true,
				FastAccess: true,
				RoomID: 1,
				Type: {
					ID: 2,
					Name: 'Light',
					Type: {
						ID: 1,
						Name: 'Device'
					}
				}
			},
			{
				ID: 3,
				Name: 'roomTableLamp',
				Value: null,
				IsOn: false,
				FastAccess: false,
				RoomID: 1,
				Type: {
					ID: 3,
					Name: 'SimpleLamp',
					Type: {
						ID: 1,
						Name: 'Device'
					}
				}
			},
			{
				ID: 4,
				Name: 'bedLamp',
				Value: null,
				IsOn: false,
				FastAccess: false,
				RoomID: 1,
				Type: {
					ID: 3,
					Name: 'SimpleLamp',
					Type: {
						ID: 1,
						Name: 'Device'
					}
				}
			},
			{
				ID: 5,
				Name: 'roomThermometer',
				Value: 18,
				IsOn: true,
				FastAccess: false,
				RoomID: 1,
				Type: {
					ID: 4,
					Name: 'TemperatureSensor',
					Type: {
						ID: 2,
						Name: 'Sensor'
					}
				}
			},
			{
				ID: 6,
				Name: 'roomBrightness',
				Value: 480,
				IsOn: true,
				FastAccess: false,
				RoomID: 1,
				Type: {
					ID: 5,
					Name: 'LightSensor',
					Type: {
						ID: 2,
						Name: 'Sensor'
					}
				}
			}];

			return {
				get: function(id){
					return _.find(devices, function(device){
						return device.ID == id;
					});
				},
				getAll: function(){
					return devices;
				},
				getByRoomID: function(roomID){
					return _.filter(devices, function(device){
						return device.RoomID == roomID;
					});
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