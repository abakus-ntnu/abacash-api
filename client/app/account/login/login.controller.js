'use strict';

angular.module('abacashApp')
  .controller('LoginCtrl', function ($scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('app.systems')
        })
        .catch( function(err) {
          
          $scope.errors.other = err.message;
        });
      }
    };

  });
