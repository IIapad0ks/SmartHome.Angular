'use strict';

(function(){
	var app = angular.module('smartHomeApp')

    .controller('deviceController', ['deviceModel', '$routeParams', function (deviceModel, $routeParams){
	    this.vm = new deviceModel($routeParams.id);
    }]);
})();