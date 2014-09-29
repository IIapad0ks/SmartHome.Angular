'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('actionService', ['Restangular', function(Restangular){
			var dbActions = Restangular.all('actions');

			return {
				getAll: function(){
					return dbActions.getList();
				}
			}
    }]);
})();