'use strict';

angular.module('abacashApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngTagsInput'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $urlRouterProvider.otherwise('/');

      $stateProvider
          .state('app', {
            url: '/',
        views: {
            'navbar@': {
                templateUrl: 'components/navbar/navbar.html',
                controller: 'NavbarCtrl'
            },
            'main@': {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            }
        }
    })

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      console.log(next);
      Auth.isLoggedInAsync(function(loggedIn) {
        if (/*next.authenticate && */!loggedIn) {
          $location.path('/login');
        }
      });
    });
  });