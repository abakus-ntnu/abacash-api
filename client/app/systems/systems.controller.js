'use strict';

angular.module('abacashApp')
  .controller('SystemsCtrl', function ($scope, $state) {

  		$scope.isActive = function(name) {
			return $state.current.name === name;
		};

  })
	.controller('AllSystemsCtrl', function ($scope, $state, System, Auth) {

		if(Auth.getCurrentSystem()){
			Auth.clearSystem();
		}
		System.query().$promise
			.then(function(systems) {
				$scope.systems = systems;
			})
			.catch(function(error) {

			});
		

		$scope.select = function(id){
			Auth.useSystem(id)
			.then(function(){
				console.log("go")
				$state.go('app.home')
			}).catch(function(error){
				console.log(error)
			})
		};

	})

	.controller('NewSystemCtrl', function ($scope, $state, System) {

		$scope.submitted = false;

		$scope.newSystem = {};

		$scope.abort = function(){
			$state.go('app.systems');
		}

		$scope.create = function(form){
			$scope.submitted = true;
			if(form.$valid){
				System.create($scope.newSystem,
		          function(data) {
		          	$state.go('app.systems')
		            console.log(data);
		          },
		          function(err) {
		            console.log(err)
		          });

			}
		}

	});
