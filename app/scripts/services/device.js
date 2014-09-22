'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('deviceService', ['DEVICE_TYPE_ID', function(deviceTypeID){
			var devices = [{
				ID: 1,
				Name: 'roomConditioner',
				Value: 23,
				IsOn: true,
				FastAccess: true,
				RoomID: 1,
				NeedTimeControl: false,
				WorkingTime: null,
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
				NeedTimeControl: false,
				WorkingTime: 7200,
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
				NeedTimeControl: false,
				WorkingTime: null,
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
				NeedTimeControl: false,
				WorkingTime: null,
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
				NeedTimeControl: false,
				WorkingTime: 26218,
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
				Value: 75,
				IsOn: true,
				FastAccess: false,
				RoomID: 1,
				NeedTimeControl: false,
				WorkingTime: 37561,
				Type: {
					ID: 5,
					Name: 'LightSensor',
					Type: {
						ID: 2,
						Name: 'Sensor'
					}
				}
			},
			{
				ID: 7,
				Name: 'window',
				Value: 10,
				IsOn: true,
				FastAccess: false,
				RoomID: 1,
				NeedTimeControl: true,
				WorkingTime: 600,
				Type: {
					ID: 6,
					Name: 'Window',
					Type: {
						ID: 1,
						Name: 'Device'
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
				add: function(device){
					devices.push(device);
				},
				update: function(device){
					var index = _.indexOf(devices, device);
					devices[index] = device;

					return true;
				},
				delete: function(device){
					var index = _.indexOf(devices, device);
					devices.splice(index, 1);

					return true;
				},
				hasValue: function(device){
					return device.Value !== null;
				},
				canChangeValue: function(device){
          return this.hasValue(device) && device.Type.Type.ID == deviceTypeID;
        },
        on: function(device){
        	device.IsOn = true;
        	this.update(device);
        },
        off: function(device){
        	device.IsOn = false;
        	device.WorkingTime = 0;
        	this.update(device);
        },
        toggle: function(device){
        	if(device.IsOn){
        		this.on(device);
        	} else {
        		this.off(device);
        	}
        },
        setValue: function(device){
        	this.update(device);
        }
			}
    }]);
})();