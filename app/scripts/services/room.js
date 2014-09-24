'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('roomService', ['deviceService', function(deviceService){
			var dbRooms = [{
				ID: 1,
				Name: 'BedRoom'
			}];

			return {
				get: function(id){
					return _.find(dbRooms, function(room){
						return room.ID == id;
					});
				},
				getDevices: function(room){
					return deviceService.getByRoomID(room.ID);
				}
			}
    }]);
})();