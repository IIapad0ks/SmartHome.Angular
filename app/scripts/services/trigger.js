'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('triggerService', ['Restangular', '$q', function(Restangular, $q){
			var dbTriggers = Restangular.all('triggers');

			return {
				get: function(id){
					return dbTriggers.get(id);
				},
				getByDeviceId: function(deviceId){
					var def = $q.defer();

					dbTriggers.getList().then(function(triggers){
						triggers = _.filter(triggers, function(trigger){
							return trigger.device._id == deviceId || trigger.sensor._id == deviceId;
						});

						def.resolve(triggers);
					});

					return def.promise;
				},
				add: function(trigger){
					return dbTriggers.post(trigger);
				},
				update: function(trigger){
					return dbTriggers.customPUT(trigger);
				},
				remove: function(trigger){
					return dbTriggers.all(trigger._id).remove();
				}
			}
    }]);
})();