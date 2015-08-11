'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: 'home',
        views: {
            'main@': {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl'
            }
        }
      })
      .state('app.home.settings', {
        url: '/settings',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/types.products.html',
                controller: 'ProductTypesCtrl'
            }
        }
      })
      .state('app.home.auth', {
        url: '/auth',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/types.products.html',
                controller: 'ProductTypesCtrl'
            }
        }
      })
  });