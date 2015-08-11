'use strict';

angular.module('abacashApp')
  .controller('CustomersCtrl', function ($scope, $state) {

    $scope.isActive = function(name) {
      return $state.current.name === name;
    };

  })
  .controller('AllCustomersCtrl', function ($scope, $state, customers) {

		$scope.customers = customers;
		console.log(customers)

		$scope.search = '';
		$scope.predicate = 'name';
		$scope.reverse = false;

		$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};

		$scope.select = function(id){
			$state.go('app.customers.customer', { id: id });
		};   

  })

  .controller('CustomerCtrl', function ($scope, $state, customer, Auth) {

    	$scope.customer = customer;
    	$scope.roles = Auth.getCustomerRoles();
    	$scope.isEdit = false;
    	var preEdit;

    	for (var i = $scope.roles.length - 1; i >= 0; i--) {
    		if($scope.customer.role.role === $scope.roles[i].role) {
    			$scope.customer.role = $scope.roles[i]
       		};
    	};

    	$scope.edit = function(){
    		$scope.isEdit = true;
    		preEdit = angular.copy($scope.customer);
    	}

    	$scope.save = function(){

    	}

    	$scope.abort = function(){
    		$scope.customer = preEdit;
    		$scope.isEdit = false;
    		for (var i = $scope.roles.length - 1; i >= 0; i--) {
	    		if(preEdit.role.role === $scope.roles[i].role) {
	    			$scope.customer.role = $scope.roles[i]
	       		};
	    	};
    	}

    	$scope.charge = function(){

    	}

  })

  .controller('RoleCtrl', function ($scope, $state) {

    

  })
  .controller('NewRoleCtrl', function ($scope, $state) {
  	$scope.role = {
  		isSeller: false,
  		hasInternalPrice: false
  	}
    

  })
  .controller('RolesCtrl', function ($scope, $state, Auth, Customer) {

  	var roles = Auth.getCustomerRoles();
  	$scope.roles = [];
  	$scope.predicate = 'name';
		$scope.reverse = false;

  	$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};

		$scope.edit = function(role){
			$state.go('app.customers.roles.role', { id: role });
		}; 

  	for (var i = roles.length - 1; i >= 0; i--) {
    		Customer.getCustomersByRole(roles[i], function(customers, role){
    			role.customers = customers
              $scope.roles.push(role);
    		});
    	};
    

  })

