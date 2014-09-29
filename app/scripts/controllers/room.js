'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .controller('roomController', ['roomModel', function (roomModel) {
	    this.vm = new roomModel('54290fd87c8865f0b594ebe3');
    }]);
})();