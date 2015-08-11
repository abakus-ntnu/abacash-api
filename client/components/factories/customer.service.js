angular.module('abacashApp')
.factory('Customer', function ($resource) {

    var CustomerResource = $resource('/api/customers/:id/:controller', {
        id: '@_id'
        },
        {
        getAll : {
            method  : 'GET',
            isArray : true
        },
        get : {
            method  : 'GET'
        },
        getCustomersByRole : {
            method  : 'GET',
            params  : {id : 'role'},
            isArray : true
        }
    });

    return {

        getAll: function(callback) {
            var cb = callback || angular.noop;
            return CustomerResource.getAll(function(customers) {
                return cb(customers);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        get: function(id, callback) {
            var cb = callback || angular.noop;
            return CustomerResource.get({id: id}, function(customer) {
                return cb(customer);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
        getCustomersByRole: function(role, callback) {
            var cb = callback || angular.noop;
            return CustomerResource.getCustomersByRole({controller: role.role}, function(customers) {
                return cb(customers, role);
            },  function(err) {
                return cb(err);
            }).$promise;
        },
    };
});