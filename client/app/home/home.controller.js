'use strict';

angular.module('abacashApp')
  .controller('HomeCtrl', function ($scope, $state) {
  	
  	$scope.isActive = function(name) {
      return $state.current.name === name;
    };

  });
