'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .controller('roomViewController', ['roomViewModel', '$routeParams', function (roomViewModel, $routeParams) {
	    this.vm = new roomViewModel($routeParams.id);
    }]);
})();