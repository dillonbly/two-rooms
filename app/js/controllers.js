'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('SettingsCtrl', ['$scope', function($scope) {

  }])
  .controller('TimerCtrl', ['$scope', '$interval', function($scope, $interval) {

    var timesUp = function() {
      $scope.message = "Times up!"
    };
    var stop;

    var countDown = function() {
      $scope.timeRemaining.seconds -= 1;
      if ($scope.timeRemaining.seconds == -1) {
        if ($scope.timeRemaining.minutes == 0) {
          timesUp();
          return;
        }
        $scope.timeRemaining.minutes -= 1;
        $scope.timeRemaining.seconds = 59;
      }
    };

    $scope.start = function() {
      $scope.started = true;
      stop = $interval(countDown, 1000);
    };
    $scope.pause = function() {
      $scope.started = false;
      if (stop) {
        $interval.cancel(stop);
      }
    };
    $scope.reset = function() {
      $scope.timeRemaining = {minutes: 2, seconds: 0};
      $scope.pause();
    };

    $scope.reset();
    
  }])
  .controller('MenuCtrl', ['$scope', function($scope) {

  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
