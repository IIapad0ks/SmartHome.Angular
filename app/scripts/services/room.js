'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .service('roomService', ['deviceService', function(deviceService){
			var rooms = [{
				ID: 1,
				Name: 'BedRoom'
			}];
			rooms[0].devices = deviceService.getByRoomID(1);

			return {
				get: function(id){
					var room = _.find(rooms, function(room){
						return room.ID == id;
					});

					return room;
				}
			}
    }]);
})();