'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('roomService', ['deviceService', 'Restangular', function(deviceService, Restangular){
			var dbRooms = Restangular.all('rooms');

			return {
				get: function(id){
					return dbRooms.get(id);
				}
			}
    }]);
})();