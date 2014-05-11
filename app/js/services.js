'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .service('GameState', function() {
    this.game = {
      numberOfRounds: 3,
      rounds: [
        {minutes:3, hostages:1},
        {minutes:2, hostages:1},
        {minutes:1, hostages:1}
      ]
    };

    this.updateState = function(newState) {
      game = newState;
    };
    this.getState = function() {
      return this.game;
    };
  });
