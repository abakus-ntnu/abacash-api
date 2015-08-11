'use strict';

angular.module('abacashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.products', {
        url: 'products',
        views: {
            'main@': {
                templateUrl: 'app/products/products.html',
                controller: 'ProductsCtrl'

            },
            'content@app.products': {
                templateUrl: 'app/products/all.products.html',
                controller: 'AllProductsCtrl'
            }
        }
      })
      .state('app.products.new', {
        url: '/new',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/new.products.html',
                controller: 'NewProductCtrl'
            }
        }
      })
      .state('app.products.types.new', {
        url: '/new',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/new.type.html',
                controller: 'NewProductTypeCtrl'
            }
        }
      })
      .state('app.products.types', {
        url: '/types',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/types.products.html',
                controller: 'ProductTypesCtrl'
            }
        }
      })
      .state('app.products.product', {
        url: '/:id',
        views: {
            'content@app.products': {
                templateUrl: 'app/products/single.product.html',
                controller: 'ProductCtrl'
            }
        }
      })
  });