'use strict';

(function(){
	var app = angular.module('smartHomeApp')
    .controller('fastAccessController', ['fastAccessModel', function (fastAccessModel){
      this.vm = new fastAccessModel();
    }])
})();
