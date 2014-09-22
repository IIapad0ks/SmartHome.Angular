'use strict';

(function(){
	var app = angular.module('smartHomeApp')
		.constant('DEVICE_TYPE_ID', 1)

		.constant('SENSOR_TYPE_ID', 2)

		.constant('TEMPERATURE_SENSOR_TYPE_ID', 4)

		.constant('BRIGHTNESS_SENSOR_TYPE_ID', 5)

		.constant('TEMPERATURE_DEVICE_TYPE_IDS', [1])

		.constant('BRIGHTNESS_DEVICE_TYPE_IDS', [2])

    .factory('roomModel', ['roomService', 'deviceService', 'TEMPERATURE_SENSOR_TYPE_ID', 'BRIGHTNESS_SENSOR_TYPE_ID', 'TEMPERATURE_DEVICE_TYPE_IDS', 'BRIGHTNESS_DEVICE_TYPE_IDS', 'DEVICE_TYPE_ID', 'SENSOR_TYPE_ID',  function(roomService, deviceService, temperatureSensorTypeID, brightnessSensorTypeID, temperatureDeviceTypeIDs, brightnessDeviceTypeIDs, deviceTypeID, sensorTypeID){
			return function(id){
				this.room = roomService.get(id);
				this.deviceService = deviceService;
				this.addingDevice = false;

				var temperatureSensors = _.filter(this.room.devices, function(device){
					return device.Type.Type.ID == sensorTypeID && device.Type.ID == temperatureSensorTypeID;
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
				
				this.temperatureSensorsValue = _.reduce(temperatureSensors, function(memo, sensor){
					return memo + sensor.Value;
				}, 0) / temperatureSensors.length;

				this.hasTemperatureDevices = temperatureDevices.length > 0;
				this.temperatureDevicesValue = _.reduce(temperatureDevices, function(memo, device){
					return memo + device.Value;
				}, 0) / temperatureDevices.length;
				this.temperatureDevicesIsOn = _.filter(temperatureDevices, function(device){ return device.IsOn; }).length > 0;

				this.brightnessSensorsValue = _.reduce(brightnessSensors, function(memo, sensor){
					return memo + sensor.Value;
				}, 0) / brightnessSensors.length

				this.hasBrightnessDevices = brightnessDevices.length > 0;
				this.brightnessDevicesValue = _.reduce(brightnessDevices, function(memo, device){
					return memo + device.Value;
				}, 0) / brightnessDevices.length;
				this.brightnessDevicesIsOn = _.filter(brightnessDevices, function(device){ return device.IsOn; }).length > 0;

				var toggleDevices = function(devices, isOn){
					angular.forEach(devices, function(device){
						device.IsOn = isOn;
						if(isOn){
							deviceService.on(device);
						} else {
							deviceService.off(device);
						}
					});
				}

				var setDevicesValue = function(devices, value){
					angular.forEach(devices, function(device){
						device.Value = value;
						deviceService.setValue(device);
					});
				}

				this.deleteDevice = function(device){
					var index = _.indexOf(this.room.devices, device);
					this.room.devices.splice(index, 1);

					deviceService.delete(device);
				}

				this.addDevice = function(device){
					this.room.devices.push(device);

					deviceService.add(device);
				}

				this.temperatureDevicesToggle = function(){
					toggleDevices(temperatureDevices, this.temperatureDevicesIsOn);
				}

				this.brightnessDevicesToggle = function(){
					toggleDevices(brightnessDevices, this.brightnessDevicesIsOn);
				}

				this.setTemperatureDevicesValue = function(){
					setDevicesValue(temperatureDevices, this.temperatureDevicesValue);
				}

				this.setBrightnessDevicesValue = function(){
					setDevicesValue(brightnessDevices, this.brightnessDevicesValue);
				}
			}
    }]);
})();