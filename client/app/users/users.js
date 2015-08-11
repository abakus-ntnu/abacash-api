'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.users', {
        url: 'users',
        views: {
            'main@': {
                templateUrl: 'app/users/users.html',
                controller: 'UsersCtrl'

            },
            'content@app.users': {
                templateUrl: 'app/users/all.users.html',
                controller: 'AllUsersCtrl'
            }
        }
      })
      .state('app.users.new', {
        url: '/new',
        views: {
            'content@app.users': {
                templateUrl: 'app/users/new.user.html',
                controller: 'NewUserCtrl'
            }
        }
      })
      .state('app.users.user', {
        url: '/:id',
        views: {
            'content@app.users': {
                templateUrl: 'app/users/single.user.html',
                controller: 'UserCtrl'
            }
        }, 
        resolve: {
          user : ['User', '$stateParams', function(User, $stateParams){
            console.log($stateParams);
            return User.get({id: $stateParams.id}).$promise
              .then(function(user) {
               return user;
              })
              .catch(function(error) {
                 return error;
              });
        }]
      }
      })
  });