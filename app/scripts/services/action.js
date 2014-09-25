'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .service('actionService', ['Restangular', function(Restangular){
			var dbActions = Restangular.all('action');

			return {
				getAll: function(){
					return dbActions.getList();
				}
			}
    }]);
})();