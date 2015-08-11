'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.systems', {
        url: 'systems',
        views: {
            'main@': {
                templateUrl: 'app/systems/systems.html',
                controller: 'SystemsCtrl'

            },
            'content@app.systems': {
                templateUrl: 'app/systems/all.systems.html',
                controller: 'AllSystemsCtrl'
            }
        }
      })
      .state('app.systems.new', {
        url: '/new',
        views: {
            'content@app.systems': {
                templateUrl: 'app/systems/new.system.html',
                controller: 'NewSystemCtrl'
            }
        }
      })
  });