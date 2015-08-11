'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.transactions', {
        url: 'transactions',
        views: {
            'main@': {
                templateUrl: 'app/transactions/transactions.html',
                controller: 'TransactionsCtrl'
            }
        }
      });
  });