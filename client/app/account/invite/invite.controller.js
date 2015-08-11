'use strict';

angular.module('abacashApp')
  .controller('InviteCtrl', function ($scope, Auth, user, $state) {
    $scope.user = user;
    $scope.errors = {};

    $scope.invite = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.invite(user._id,{
          email: $scope.user.email,
          name: $scope.user.name,
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