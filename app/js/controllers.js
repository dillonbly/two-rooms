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
    $scope.numberOfRounds = game.numberOfRounds;
    $scope.roundIndex = 0;

    var stop;
    $scope.pause = function() {
      $scope.started = false;
      if (stop) {
        $interval.cancel(stop);
      }
    };
    $scope.reset = function() {
      $scope.timeRemaining = {minutes: $scope.round.minutes, seconds: 0};
      $scope.pause();
      $scope.roundOver = false;
    };
    var updateRound = function() {
      $scope.round = game.rounds[$scope.roundIndex];
      $scope.reset();
    };
    updateRound();

    var timesUp = function() {
      var bomb = document.getElementById("bomb");
      bomb.load();
      bomb.play();
      $scope.timeRemaining.seconds = 0;
      $scope.pause();
      $scope.roundOver = true;
    };

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
      var ticktock = document.getElementById("ticktock");
      ticktock.load();
      ticktock.play();
    };
    $scope.prev = function() {
      $scope.roundIndex -= 1;
      updateRound();
    };
    $scope.next = function() {
      $scope.roundIndex += 1;
      updateRound();
    };
    
  }])
  .controller('MenuCtrl', ['$scope', function($scope) {

  }])
