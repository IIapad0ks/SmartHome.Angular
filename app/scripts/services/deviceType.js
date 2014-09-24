'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('deviceTypeService', function(){
			var deviceTypes = [{
				ID: 1,
				Name: 'Conditioner',
				Type: {
					ID: 1,
					Name: 'Device'
				}
			},
			{
				ID: 2,
				Name: 'Light',
				Type: {
					ID: 1,
					Name: 'Device'
				}
			},
			{
				ID: 3,
				Name: 'SimpleLamp',
				Type: {
					ID: 1,
					Name: 'Device'
				}
			},
			{
				ID: 4,
				Name: 'TemperatureSensor',
				Type: {
					ID: 2,
					Name: 'Sensor'
				}
			},
			{
				ID: 5,
				Name: 'LightSensor',
				Type: {
					ID: 2,
					Name: 'Sensor'
				}
			},
			{
				ID: 6,
				Name: 'Window',
				Type: {
					ID: 1,
					Name: 'Device'
				}
			}];

			return {
				get: function(id){
					return _.find(deviceTypes, function(deviceType){
						return deviceType.ID == id;
					});
				},
				getAll: function(){
					return deviceTypes;
				}
			}
    });
})();