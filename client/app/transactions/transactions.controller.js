'use strict';

angular.module('abacashApp')
  .controller('TransactionsCtrl', function ($scope, $state) {
  	$scope.transaction =
  	{
  		_id: "sdasdpioaksda",
  		timestamp: "2014-10-04 16:30:24.350Z",
  		total: 200,
  		system: 
  		{
  			name: "labamba",
  			_id: "ssadasdpaksd",
  			displayName: "LaBamba"
  		},
  		seller: 
  		{
  			username: "krisklar",
  			_id: "ssadasdpaksd",
  			displayName: "Kristoffer Larsen"
  		},
  		customer: 
  		{
  			usernmae: "ragnsces",
  			_id: "ssadasdpaksd",
  			displayName: "Ragnhild Neset"
  		},
  		items: 
  		[{
  			name: "Fireball",
  			_id: "ssadasdpaksd",
  			pricePaid: 100
  		},
  		{
  			name: "Fireball",
  			_id: "ssadasdpaksd",
  			pricePaid: 100
  		}]
  	}
  });
