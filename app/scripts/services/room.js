'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('roomService', ['deviceService', 'Restangular', function(deviceService, Restangular){
			var dbRooms = Restangular.all('room');

			return {
				get: function(id){
					return dbRooms.get(id);
				}
			}
    }]);
})();