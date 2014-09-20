'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('roomService', ['deviceService', function(deviceService){
			var rooms = [{
				ID: 1,
				Name: 'BedRoom'
			}];

			return {
				get: function(id){
					return _.find(rooms, function(room){
						return room.ID == id;
					});
				},
				getDevices: function(id){
					return deviceService.getByRoomID(id);
				}
			}
    }]);
})();