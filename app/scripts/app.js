'use strict';

/**
 * @ngdoc overview
 * @name smartHomeApp
 * @description
 * # smartHomeApp
 *
 * Main module of the application.
 */
angular
  .module('smartHomeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/room/:id', {
        templateUrl: 'views/room.html',
        controller: 'RoomController'
      })
      .when('/device/:id', {
        templateUrl: 'views/device.html',
        controller: 'DeviceController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
