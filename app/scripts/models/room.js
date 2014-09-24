'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		
		.constant('TEMPERATURE_SENSOR_TYPE_ID', 4)

		.constant('BRIGHTNESS_SENSOR_TYPE_ID', 5)

		.constant('TEMPERATURE_DEVICE_TYPE_IDS', [1])

		.constant('BRIGHTNESS_DEVICE_TYPE_IDS', [2])

    .factory('roomModel', ['roomService', 'deviceService', 'TEMPERATURE_SENSOR_TYPE_ID', 'BRIGHTNESS_SENSOR_TYPE_ID', 'TEMPERATURE_DEVICE_TYPE_IDS', 'BRIGHTNESS_DEVICE_TYPE_IDS', 'DEVICE_TYPE_ID', 'SENSOR_TYPE_ID',  function(roomService, deviceService, temperatureSensorTypeID, brightnessSensorTypeID, temperatureDeviceTypeIDs, brightnessDeviceTypeIDs, deviceTypeID, sensorTypeID){
			return function(id){
				this.deviceService = deviceService;

				this.room = roomService.get(id);
				this.room.devices = deviceService.getByRoomID(this.room.ID);

				//GETTING DEVICES
				var temperatureSensors = _.filter(this.room.devices, function(device){
					return device.Type.Type.ID == sensorTypeID && device.Type.ID == temperatureSensorTypeID && device.IsOn;
				});
				var brightnessSensors = _.filter(this.room.devices, function(device){
					return device.Type.Type.ID == sensorTypeID && device.Type.ID == brightnessSensorTypeID;
				});
				var temperatureDevices = _.filter(this.room.devices, function(device){
					return device.Type.Type.ID == deviceTypeID && _.contains(temperatureDeviceTypeIDs, device.Type.ID);
				});
				var brightnessDevices = _.filter(this.room.devices, function(device){
					return device.Type.Type.ID == deviceTypeID && _.contains(brightnessDeviceTypeIDs, device.Type.ID);
				});
				
				//TEMPERATURE BLOCK
				this.temperatureRangeValue = null;
				this.temperatureIsOn = null;

				this.getTemperatureSensorsValue = function(){ 
					return _.reduce(temperatureSensors, function(memo, sensor){
						return memo + parseInt(sensor.Value);
					}, 0) / temperatureSensors.length;
				}

				this.hasTemperatureDevices = function(){ return temperatureDevices.length > 0; }
				this.getTemperatureDevicesValue = function(){ 
					this.temperatureRangeValue = _.reduce(temperatureDevices, function(memo, device){
						return memo + parseInt(device.Value);
					}, 0) / temperatureDevices.length;

					return this.temperatureRangeValue;
				}
				this.temperatureDevicesIsOn = function(){ 
					this.temperatureIsOn = _.filter(temperatureDevices, function(device){ return device.IsOn; }).length > 0; 

					return this.temperatureIsOn;
				}

				this.temperatureRangeValue = this.getTemperatureDevicesValue();
				this.temperatureIsOn = this.temperatureDevicesIsOn();

				//BRIGHTNESS BLOCK
				this.brightnessRangeValue = null;
				this.brightnessIsOn = null;

				this.getBrightnessSensorsValue = function(){
					return _.reduce(brightnessSensors, function(memo, sensor){
						return memo + parseInt(sensor.Value);
					}, 0) / brightnessSensors.length;
				}

				this.hasBrightnessDevices = function(){ return brightnessDevices.length > 0; }
				this.getBrightnessDevicesValue = function(){ 
					this.brightnessRangeValue = _.reduce(brightnessDevices, function(memo, device){
						return memo + parseInt(device.Value);
					}, 0) / brightnessDevices.length;

					return this.brightnessRangeValue;
				}
				this.brightnessDevicesIsOn = function(){
					this.brightnessIsOn = _.filter(brightnessDevices, function(device){ return device.IsOn; }).length > 0;

					return this.brightnessIsOn;
				}

				this.brightnessRangeValue = this.getBrightnessDevicesValue();
				this.brightnessIsOn = this.brightnessDevicesIsOn();

				//METHODS
				var toggleDevices = function(devices, isOn){
					_.each(devices, function(device){
						device.IsOn = isOn;
						if(isOn){
							deviceService.on(device);
						} else {
							deviceService.off(device);
						}
					});
				}

				var setDevicesValue = function(devices, value){
					_.each(devices, function(device){
						deviceService.setValue(device, value);
					});
				}

				this.temperatureDevicesToggle = function(){
					toggleDevices(temperatureDevices, this.temperatureIsOn);
				}

				this.brightnessDevicesToggle = function(){
					toggleDevices(brightnessDevices, this.brightnessIsOn);
				}

				this.setTemperatureDevicesValue = function(){
					setDevicesValue(temperatureDevices, this.temperatureRangeValue);
				}

				this.setBrightnessDevicesValue = function(){
					setDevicesValue(brightnessDevices, this.brightnessRangeValue);
				}
			}
    }]);
})();