'use strict';

angular.module('abacashApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state, $rootScope) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isInSystem = Auth.isInSystem;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getCurrentSystem = Auth.getCurrentSystem;

    $scope.abacashMenu = [
    {
      'title': 'Systemer',
        'link': '/systems',
        'uisref': 'app.systems',
        'image': '/assets/icons/organization.svg'
    },
    {
      'title': 'Brukere',
        'link': '/users',
        'uisref': 'app.users',
        'image': '/assets/icons/organization.svg'
    }
    ];
    
    $scope.systemMenu = [
    {
        'link': '/home',
        'uisref': 'app.home',
        'image': '/assets/icons/organization.svg',
        "show": false
    },
    {
      'title': 'Kunder',
        'link': '/customers',
        'uisref': 'app.customers',
        'image': '/assets/icons/organization.svg',
        "show": true
    },
    {
      'title': 'Produkter',
        'link': '/products',
        'uisref': 'app.products',
        'image': '/assets/icons/organization.svg',
        "show": true
    },
    {
      'title': 'Transaksjoner',
        'link': '/transactions',
        'uisref': 'app.transactions',
        'image': '/assets/icons/organization.svg',
        "show": true
    },
    {
      'title': 'Økonomi',
        'link': '/economy',
        'uisref': 'app.economy',
        'image': '/assets/icons/organization.svg',
        "show": true
    }
    ];

    $scope.logout = function() {
      Auth.logout();
      $state.go('app')
    };

    $scope.clearSystem = function() {
      Auth.clearSystem();
      $state.go('app.systems')
    };

    $scope.settings = function() {
      $state.go('app.me')
    };

    $scope.isActive = function(name) {
      return $state.includes(name);
    };

  });