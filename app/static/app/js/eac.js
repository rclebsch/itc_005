var eacApp = angular.module('eacApp', ['ngRoute','ngTable']);

eacApp.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-table/filters/text.html', '<input placeholder="select filter" type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" ng-if="filter == \'text\'" class="input-filter form-control" />');
}
]);

angular.module("eacApp").factory("IssueService", ["$resource", function($resource) {
    return $resource("/events/", {
      state: "open"
    }, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  }]);

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

eacApp.controller('eventsContentCtrl', eventsContentCtrl);


function eventsContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.events = [];
    $scope.data = [];
    $scope.eventsTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function ($defer, params) {
                    var filteredData = params.sorting() ? $filter('orderBy')($scope.events, params.orderBy()) : $scope.events;
                    var sortedData = params.filter() ? $filter('filter')(filteredData, params.filter()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    $defer.resolve($scope.data);
                }
            });

	$scope.init = function(){
		console.log('eventsContentCtrl.init');
		$http({
	        method: 'GET',
	        url: 'events'
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.events = result;
            $scope.eventsTable.reload();
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    });
	};
};

eacApp.controller('titleCtrl', function ($scope) {
    $scope.title = '-The Project';
})






