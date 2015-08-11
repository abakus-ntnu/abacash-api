angular.module('abacashApp')
.factory('Product', function ($resource) {

    var ProductResource = $resource('/api/products/:id/:controller', {
        id: '@_id'
        },
        {
        getAll : {
            method  : 'GET',
            params  : {id : 'all'},
            isArray : true
        },
        getProductsByType : {
            method  : 'GET',
            params  : {id : 'type'},
            isArray : true
        }
    });

    return {

        getAll: function(callback) {
            var cb = callback || angular.noop;
            return ProductResource.getAll(function(products) {
                return cb(products);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        getActive: function(callback) {
            var cb = callback || angular.noop;
            return ProductResource.getUsers(function(users) {
                return cb(users);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        getProduct: function(id, callback) {
            var cb = callback || angular.noop;
            return ProductResource.getUsers(function(users) {
                return cb(users);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        getProductsByType: function(type, callback) {
            var cb = callback || angular.noop;
            return ProductResource.getProductsByType({controller: type}, function(products) {
                return cb(products, type);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        createProduct: function(product, callback) {
            var cb = callback || angular.noop;
            return ProductResource.getUsers(function(users) {
                return cb(users);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        updateProduct: function(id, product, callback) {
            var cb = callback || angular.noop;
            return ProductResource.getUsers(function(users) {
                return cb(users);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        deleteProduct: function(id, callback) {
            var cb = callback || angular.noop;
            return ProductResource.getUsers(function(users) {
                return cb(users);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
    };
});