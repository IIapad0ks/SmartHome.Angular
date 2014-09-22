'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .controller('roomController', ['roomModel', function (roomModel) {
	    this.vm = new roomModel(1);
    }]);
})();