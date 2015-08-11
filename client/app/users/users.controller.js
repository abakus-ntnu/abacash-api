'use strict';

angular.module('abacashApp')
	.controller('UsersCtrl', function ($scope, $state) {

		$scope.isActive = function(name) {
			return $state.current.name === name;
		};

	})

	.controller('AllUsersCtrl', function ($scope, User, $state) {

		User.query().$promise
			.then(function(users) {
				$scope.users = users;
			})
			.catch(function(error) {
			 	
			});

		$scope.search = '';
		$scope.predicate = 'displayname';
		$scope.reverse = false;

		$scope.order = function(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		};

		$scope.select = function(id){
			$state.go('app.users.user', { id: id });
		};

	})

	.controller('NewUserCtrl', function ($scope, $state, Auth) {

		$scope.newUser = {};
		$scope.submitted = false;

		Auth.getNewUserData(function(data){
			var temp = [];
			for (var i = data.systems.length - 1; i >= 0; i--) {
				temp.push(data.systems[i].name)
			};
			$scope.systems = temp;
			$scope.userRoles = data.userRoles;
			$scope.newUser.role = $scope.userRoles[0];
		});

		$scope.abort = function(){
			$state.go('app.users');
		}

		$scope.invite = function(form){
			$scope.submitted = true;
			if(form.$valid){
				var temp = [];
				for (var i = $scope.newUser.systems.length - 1; i >= 0; i--) {
					temp.push($scope.newUser.systems[i].text)
				};
				$scope.newUser.systems=temp;
				Auth.inviteUser($scope.newUser)
				.then(function(response){
					$scope.abort();
				})
				.catch( function(err) {
		          $scope.errors = err.data.errors.email.message;
		        });
			}
		}
	})

	.controller('UserCtrl', function ($scope, user) {
		$scope.user = user;
	})
