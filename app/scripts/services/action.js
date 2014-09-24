'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('actionService', function(){
			var actions = [{
				ID: 1,
				Name: 'ON'
			},
			{
				ID: 2,
				Name: 'OFF'
			},
			{
				ID: 3,
				Name: 'Set value'
			}];

			return {
				getAll: function(){
					return actions;
				},
				canSetValue: function(action){
					return action.ID == 3;
				}
			}
    });
})();