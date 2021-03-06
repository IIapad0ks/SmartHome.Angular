'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		
		.constant('TEMPERATURE_SENSOR_TYPE_ID', "542912527c8865f0b594ebeb")

		.constant('BRIGHTNESS_SENSOR_TYPE_ID', "542912527c8865f0b594ebea")

		.constant('TEMPERATURE_DEVICE_TYPE_IDS', ["5429118d7c8865f0b594ebe6"])

		.constant('BRIGHTNESS_DEVICE_TYPE_IDS', ["5429118d7c8865f0b594ebe8"])

    .factory('roomModel', ['roomService', 'deviceService', 'deviceRepository', 'TEMPERATURE_SENSOR_TYPE_ID', 'BRIGHTNESS_SENSOR_TYPE_ID', 'TEMPERATURE_DEVICE_TYPE_IDS', 'BRIGHTNESS_DEVICE_TYPE_IDS', 'DEVICE_TYPE_ID', 'SENSOR_TYPE_ID',  function(roomService, deviceService, deviceRepository, temperatureSensorTypeId, brightnessSensorTypeId, temperatureDeviceTypeIds, brightnessDeviceTypeIds, deviceTypeId, sensorTypeId){
			return function(id){
				var self = this;

				self.deviceService = deviceService;
				self.deviceRepository = deviceRepository;

				self.room = {};
				self.room.devices = [];

				var temperatureSensors = [];
				var brightnessSensors = [];
				var temperatureDevices = [];
				var brightnessDevices = [];

				roomService.get(id).then(function(room){
					self.room = room;
					self.room.devices = [];

					deviceRepository.getAll().then(function(devices){
						self.room.devices = devices;

						temperatureSensors = _.filter(self.room.devices, function(device){
							return device.type.class._id == sensorTypeId && device.type._id == temperatureSensorTypeId && device.isOn;
						});
						brightnessSensors = _.filter(self.room.devices, function(device){
							return device.type.class._id == sensorTypeId && device.type._id == brightnessSensorTypeId;
						});
						temperatureDevices = _.filter(self.room.devices, function(device){
							return device.type.class._id == deviceTypeId && _.contains(temperatureDeviceTypeIds, device.type._id);
						});
						brightnessDevices = _.filter(self.room.devices, function(device){
							return device.type.class._id == deviceTypeId && _.contains(brightnessDeviceTypeIds, device.type._id);
						});
					});
				});

				//TEMPERATURE BLOCK
				self.temperatureRangeValue = null;
				self.temperatureIsOn = null;

				self.getTemperatureSensorsValue = function(){ 
					return _.reduce(temperatureSensors, function(memo, sensor){
						return memo + parseInt(sensor.value);
					}, 0) / temperatureSensors.length;
				}

				self.hasTemperatureDevices = function(){ return temperatureDevices.length > 0; }
				self.getTemperatureDevicesValue = function(){ 
					self.temperatureRangeValue = _.reduce(temperatureDevices, function(memo, device){
						return memo + parseInt(device.value);
					}, 0) / temperatureDevices.length;

					return self.temperatureRangeValue;
				}
				self.temperatureDevicesIsOn = function(){ 
					self.temperatureIsOn = _.filter(temperatureDevices, function(device){ return device.isOn; }).length > 0; 

					return self.temperatureIsOn;
				}

				self.temperatureRangeValue = self.getTemperatureDevicesValue();
				self.temperatureIsOn = self.temperatureDevicesIsOn();

				//BRIGHTNESS BLOCK
				self.brightnessRangeValue = null;
				self.brightnessIsOn = null;

				self.getBrightnessSensorsValue = function(){
					return _.reduce(brightnessSensors, function(memo, sensor){
						return memo + parseInt(sensor.value);
					}, 0) / brightnessSensors.length;
				}

				self.hasBrightnessDevices = function(){ return brightnessDevices.length > 0; }
				self.getBrightnessDevicesValue = function(){ 
					self.brightnessRangeValue = _.reduce(brightnessDevices, function(memo, device){
						return memo + parseInt(device.value);
					}, 0) / brightnessDevices.length;

					return self.brightnessRangeValue;
				}
				self.brightnessDevicesIsOn = function(){
					self.brightnessIsOn = _.filter(brightnessDevices, function(device){ return device.isOn; }).length > 0;

					return self.brightnessIsOn;
				}

				self.brightnessRangeValue = self.getBrightnessDevicesValue();
				self.brightnessIsOn = self.brightnessDevicesIsOn();

				//METHODS
				var toggleDevices = function(devices, isOn){
					_.each(devices, function(device){
						device.isOn = isOn;
						if(isOn){
							deviceRepository.on(device);
						} else {
							deviceRepository.off(device);
						}
					});
				}

				var setDevicesValue = function(devices, value){
					_.each(devices, function(device){
						deviceRepository.setValue(device, value);
					});
				}

				self.temperatureDevicesToggle = function(){
					toggleDevices(temperatureDevices, self.temperatureIsOn);
				}

				self.brightnessDevicesToggle = function(){
					toggleDevices(brightnessDevices, self.brightnessIsOn);
				}

				self.setTemperatureDevicesValue = function(){
					setDevicesValue(temperatureDevices, self.temperatureRangeValue);
				}

				self.setBrightnessDevicesValue = function(){
					setDevicesValue(brightnessDevices, self.brightnessRangeValue);
				}
			}
    }]);
})();