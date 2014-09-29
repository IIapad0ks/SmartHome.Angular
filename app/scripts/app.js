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
    'ngTouch',
    'restangular'
  ])
  .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl("http://localhost:3000/api");

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
      })
      .when('/room/:id', {
        templateUrl: 'views/room.html',
        controller: 'roomViewController',
        controllerAs: 'room'
      })
      .when('/device/:id', {
        templateUrl: 'views/device.html',
        controller: 'deviceController',
        controllerAs: 'deviceCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
