'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('triggerService', [function(){
			var triggers = [{
				ID: 1,
				Name: 'onConditioner',
				Device: {
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
				Sensor: {
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
				Condition: '< 18',
				Action: {
					ID: 1,
					Name: 'ON'
				},
				SetValue: null
			}];

			var triggerRepository = [];

			return {
				get: function(id){
					//get from api
					var trigger = {};
					angular.copy(_.find(triggers, function(item){
						return item.ID == id;
					}), trigger);

					return trigger;
				},
				getByDeviceID: function(deviceID){
					//get from api
					angular.copy(_.filter(triggers, function(trigger){
						return trigger.Sensor.ID == deviceID || trigger.Device.ID == deviceID
					}), triggerRepository);

					return triggerRepository;
				},
				add: function(trigger){
					//add to db - return new item
					trigger.ID = _.max(triggers, function(item){
						return item.ID;
					}).ID + 1;
					triggers.push(trigger);

					var newTrigger = {};
					angular.copy(trigger, newTrigger);
					triggerRepository.push(newTrigger);

					return trigger;
				},
				update: function(trigger){
					//update on api - return true or false
					var dbIndex = _.indexOf(triggers, trigger);
					triggers[dbIndex] = trigger;

					var isUpdated = true;

					if(isUpdated){
						var index = _.indexOf(triggerRepository, trigger);
						if(index != -1){
							triggerRepository[index] = trigger;
						}
					}

					return true;
				},
				delete: function(trigger){
					//delete on api - return true or false
					var dbIndex = _.indexOf(triggers, trigger);
					if(dbIndex != -1){
						triggers.splice(dbIndex, 1);
					}

					var isDeleted = true;

					if(isDeleted){
						var index = _.indexOf(triggerRepository, trigger);
						if(index != -1){
							triggerRepository.splice(index, 1);
						}
					}

					return true;
				}
			}
    }]);
})();