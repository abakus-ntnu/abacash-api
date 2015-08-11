'use strict';

angular.module('abacashApp')
  .controller('ProductsCtrl', function ($scope, $state) {

    $scope.isActive = function(name) {
      return $state.current.name === name;
    };

  })
  .controller('AllProductsCtrl', function ($scope, $state, Product) {

		$scope.search = '';
		$scope.predicate = 'name';
		$scope.reverse = false;

        Product.getAll(function(products){
              $scope.products = products;
        });

		$scope.new = function(){
			$state.go("app.products.new")
		};

		$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};

		$scope.select = function(id){
			$state.go('app.products.product', { id: id });
		};   

  })
  .controller('NewProductCtrl', function ($scope, $state, Auth) {

  	
  	$scope.types = Auth.getProductTypes();
  	$scope.hasInternalSales = Auth.hasInternalSales();
  	$scope.newProduct = {
  		type: $scope.types[0],
  		active: false
  	};

    $scope.create = function(form){
    	if(!$scope.hasInternalSales){
    		$scope.newProduct.internalPrice = $scope.newProduct.price;
    	}
    }

    $scope.abort = function(){
    	$state.go('app.products');
    }

  })
  .controller('ProductCtrl', function ($scope, $state) {

    

  })

   .controller('NewProductTypeCtrl', function ($scope, $state) {

    

  })

  .controller('ProductTypesCtrl', function ($scope, $state, Auth, Product) {

  		$scope.predicate = 'name';
		$scope.reverse = false;
		$scope.types = [];
    	var types = Auth.getProductTypes();

  		$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};

    	for (var i = types.length - 1; i >= 0; i--) {
    		Product.getProductsByType(types[i], function(products, type){
    			var type = {
    		  	name: type,
    		  	products: products.length
    		  }
              $scope.types.push(type);
    		});
    	};

    	$scope.new = function(){
    		$state.go('app.products.types.new');

    	}

    	$scope.delete = function(type){
    		console.log(type);	
    	}
  })
