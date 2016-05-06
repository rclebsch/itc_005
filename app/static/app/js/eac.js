var eacApp = angular.module('eacApp', ['ngRoute']);

eacApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

eacApp.controller('eventBubbleCtrl', function ($scope, $http) {
	$scope.events = [];

	$scope.init = function(){
		console.log('eventBubbleCtrl.init');
		$http({
	        method: 'GET',
	        url: 'events/?count=3'
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.events = result;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    });
	};


});

