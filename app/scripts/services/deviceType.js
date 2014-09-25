'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('deviceTypeService', ['Restangular', function(Restangular){
			var dbDeviceTypes = Restangular.all('deviceType');

			return {
				get: function(id){
					return dbDeviceTypes.get(id);
				},
				getAll: function(){
					return dbDeviceTypes.getList();
				}
			}
    }]);
})();