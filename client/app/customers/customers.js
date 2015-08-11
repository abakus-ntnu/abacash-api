'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.customers', {
        url: 'customers',
        views: {
            'main@': {
                templateUrl: 'app/customers/customers.html',
                controller: 'CustomersCtrl'

            },
            'content@app.customers': {
                templateUrl: 'app/customers/all.customers.html',
                controller: 'AllCustomersCtrl'
            }
        },
        resolve: {
          customers : ['Customer', function(Customer){
            return Customer.getAll(function(customers){
              return customers;
            });
        }]
      }
      })
      .state('app.customers.roles', {
        url: '/roles',
        views: {
            'content@app.customers': {
                templateUrl: 'app/customers/roles.html',
                controller: 'RolesCtrl'
            }
        }
      })
      .state('app.customers.roles.new', {
        url: '/new',
        views: {
            'content@app.customers': {
                templateUrl: 'app/customers/new.role.html',
                controller: 'NewRoleCtrl'
            }
        }
      })
      .state('app.customers.roles.role', {
        url: '/:id',
        views: {
            'content@app.customers': {
                templateUrl: 'app/customers/role.roles.html',
                controller: 'RoleCtrl'
            }
        }
      })
      .state('app.customers.customer', {
        url: '/:id',
        views: {
            'content@app.customers': {
                templateUrl: 'app/customers/single.customer.html',
                controller: 'CustomerCtrl'
            }
        },
        resolve: {
          customer : ['Customer', '$stateParams', function(Customer, $stateParams){
            return Customer.get($stateParams.id, function(customer){
              return customer;
            });
        }]
        }
      })
  });