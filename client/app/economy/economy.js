'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.economy', {
        url: 'economy',
        views: {
            'main@': {
                templateUrl: 'app/economy/economy.html',
                controller: 'EconomyCtrl'
            }
        }
      });
  });