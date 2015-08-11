'use strict';

angular.module('abacashApp')
  .controller('ResetCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.reset = function(form) {
      $scope.submitted = true;
      console.log(form);
      if(form.$valid) {
        Auth.reset({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });