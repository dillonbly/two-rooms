'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('SettingsCtrl', ['$scope', 'GameState', function($scope, GameState) {
    var defaultRound = {minutes:1, hostages:1};
    $scope.game = angular.copy(GameState.getState());
    $scope.updateRoundCount = function() {
      $scope.game.rounds = $scope.game.rounds.slice(0, $scope.game.numberOfRounds);
      for (var i = $scope.game.rounds.length; i < $scope.game.numberOfRounds; i++) {
        $scope.game.rounds[i] = angular.copy(defaultRound);
      }
    };
    $scope.saveSettings = function() {
      GameState.updateState($scope.game);
    };
  }])
  .controller('TimerCtrl', ['$scope', '$interval', 'GameState',
      function($scope, $interval, GameState) {

    var game = GameState.getState();
    $scope.round = 0;

    var updateRound = function() {
      $scope.timeRemaining = game.rounds[$scope.round].minutes;
      $scope.message = "Round " + ($scope.round + 1) +
          ". Exchange " + game.rounds[$scope.round].hostages + " hostage.";
    };
    updateRound();

    var timesUp = function() {
      $scope.timeRemaining.seconds = 0;
      $scope.message = "End of round " + ($scope.round + 1) +
          ". Exchange " + game.rounds[$scope.round].hostages + " hostage.";
      $scope.pause();
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
