'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: 'MenuCtrl'});
  $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsCtrl'});
  $routeProvider.when('/timer', {templateUrl: 'partials/timer.html', controller: 'TimerCtrl'});
  $routeProvider.otherwise({redirectTo: '/menu'});
}]);
