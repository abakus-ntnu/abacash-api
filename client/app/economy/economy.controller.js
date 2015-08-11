'use strict';

angular.module('abacashApp')
  .controller('EconomyCtrl', function ($scope, $state) {

    $scope.isActive = function(name) {
      return $state.current.name === name;
    };

  });
