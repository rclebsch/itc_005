var eacApp = angular.module('eacApp', ['ngRoute','ngTable','ngAnimate','ngDialog']);

eacApp.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-table/filters/text.html', '<input placeholder="select filter" type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" ng-if="filter == \'text\'" class="input-filter form-control" />');
}
]);

eacApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

eacApp.config(['ngDialogProvider', function (ngDialogProvider) {
			ngDialogProvider.setDefaults({
				className: 'ngdialog-theme-default',
				plain: false,
				showClose: true,
				closeByDocument: true,
				closeByEscape: true,
				appendTo: false
			});
		}]);

eacApp.directive('defaultFirstPage', function() {
  return {
    link: function(scope, element, attrs) {

      scope.$watch(function() {
          return attrs['ngSrc'];
        }, function (value) {
          if (!value) {
            element.attr('src', attrs.defaultFirstPage);
          }
      });

      element.bind('error', function() {
        element.attr('src', attrs.defaultFirstPage);
      });
    }
  }
});


eacApp.controller('eventBubbleCtrl', function ($scope, $http) {
	$scope.initialized = false;
	$scope.events = [];

	$scope.init = function(){
		console.log('eventBubbleCtrl.init');
		if ($scope.initialized) {
			return;
		}
		$http({
	        method: 'GET',
	        url: 'events/?count=3'
	    }).success(function (result) {
	    	$scope.events = result;
			$scope.initialized = true;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};
});


eacApp.controller('eventsContentCtrl', eventsContentCtrl);

function eventsContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
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
		if ($scope.initialized) {
			return;
		}
		$http({
	        method: 'GET',
	        url: 'events'
	    }).success(function (result) {
	    	$scope.events = result;
            $scope.eventsTable.reload();
			$scope.initialized = true;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};
}

eacApp.controller('eDirectoryContentCtrl', eDirectoryContentCtrl);

function eDirectoryContentCtrl ($scope, $http, $filter, ngTableParams, ngDialog) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.directoryTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function ($defer, params) {
                    var filteredData = params.sorting() ? $filter('orderBy')($scope.contacts, params.orderBy()) : $scope.contacts;
                    var sortedData = params.filter() ? $filter('filter')(filteredData, params.filter()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    $defer.resolve($scope.data);
                }
            });

	$scope.init = function(){
		console.log('eDirectoryContentCtrl.init');
		if ($scope.initialized) {
			return;
		}
		$http({
	        method: 'GET',
	        url: 'contacts?is_individual=1'
	    }).success(function (result) {
	    	$scope.contacts = result;
            $scope.directoryTable.reload();
			$scope.initialized = true;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.openRegister = function() {
		ngDialog.open({
			template: 'registerId',
			controller: 'registerCtrl',
			className: 'ngdialog-theme-default'
		});
	};
}

eacApp.controller('contactsContentCtrl', contactsContentCtrl);

function contactsContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.contactsTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function ($defer, params) {
                    var filteredData = params.sorting() ? $filter('orderBy')($scope.contacts, params.orderBy()) : $scope.contacts;
                    var sortedData = params.filter() ? $filter('filter')(filteredData, params.filter()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    $defer.resolve($scope.data);
                }
            });

	$scope.init = function(){
		console.log('eDirectoryContentCtrl.init');
		if ($scope.initialized) {
			return;
		}
		$http({
	        method: 'GET',
	        url: 'contacts?is_individual=0'
	    }).success(function (result) {
	    	$scope.contacts = result;
            $scope.contactsTable.reload();
			$scope.initialized = true;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};
}

eacApp.controller('resourcesContentCtrl', resourcesContentCtrl);

function resourcesContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
	$scope.resources = [];
    $scope.data = [];
    $scope.resourcesTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function ($defer, params) {
                    var filteredData = params.sorting() ? $filter('orderBy')($scope.resources, params.orderBy()) : $scope.resources;
                    var sortedData = params.filter() ? $filter('filter')(filteredData, params.filter()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    $defer.resolve($scope.data);
                }
            });

	$scope.init = function(){
		console.log('resourcesContentCtrl.init');
		if ($scope.initialized) {
			return;
		}
		$http({
	        method: 'GET',
	        url: 'resources'
	    }).success(function (result) {
	    	$scope.resources = result;
            $scope.resourcesTable.reload();
			$scope.initialized = true;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};
}


eacApp.controller('registerCtrl', registerCtrl);

function registerCtrl ($scope, $http) {
	$scope.initialized = false;
	$scope.categoryId = null;
	$scope.categories = [];
	$scope.countryId = null;
	$scope.phonePrefix = null;
	$scope.phone = null;
	$scope.email = null;
	$scope.countries = [];
	$scope.borderId = null;
	$scope.border = null;
	$scope.borders = [];
	$scope.activityId = null;
	$scope.activity = null;
	$scope.activities = [];
	$scope.afiliationId = null;
	$scope.afiliation = null;
	$scope.afiliations = [];
    $scope.data = [];
	$scope.error = false;
	$scope.errorDesc = '';

	$scope.populateCountries = function() {
		console.log('populateCountries');
		$http({
	        method: 'GET',
	        url: 'countries'
	    }).success(function (result) {
	    	$scope.countries = result;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.selectCountry = function(countryId) {
		for(var index in $scope.countries) {
			if ($scope.countries[index].id == countryId) {
				$scope.phonePrefix = '+' + $scope.countries[index].phonePrefix + ' ';
				return;
			}
		}
		$scope.phonePrefix = '';
	};

	$scope.populateActivities = function() {
		console.log('populateActivities');
		$http({
	        method: 'GET',
	        url: 'contact_activities'
	    }).success(function (result) {
	    	$scope.activities = result;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.populateBorders = function() {
		console.log('populateBorders');
		$http({
	        method: 'GET',
	        url: 'borders'
	    }).success(function (result) {
	    	$scope.borders = result;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.populateAfiliations = function() {
		console.log('populateAfiliations');
		$http({
	        method: 'GET',
	        url: 'contact_afiliations'
	    }).success(function (result) {
	    	$scope.afiliations = result;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.populateCategories = function() {
		console.log('populateCategories');
		$http({
	        method: 'GET',
	        url: 'contact_categories?is_individual=1'
	    }).success(function (result) {
	    	$scope.categories = result;
			$scope.categoryId = result[0].id;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.loadJavascript = function(uri) {
	var script = document.createElement('script');
	script.src = uri;
	script.async = true;
	document.head.appendChild(script);
	};

	$scope.init = function(){
		if ($scope.initialized) {
			return;
		}
		this.populateCountries();
		this.populateActivities();
		this.populateBorders();
		this.populateAfiliations();
		this.populateCategories();
		this.loadJavascript("https://www.google.com/recaptcha/api.js");
		$scope.initialized = true;
	};

	$scope.displayError = function(error) {
		console.log(error);
		$scope.error = true;
		$scope.errorDesc = error;
	};

	$scope.register = function() {
		var token = grecaptcha.getResponse();
		if (token == '') {
			this.displayError('Validate captcha');
			return;
		}

		var newContact = {
			contactCategory: $scope.categoryId,
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			activityFree: $scope.activity,
			activityFromList: $scope.activityId,
			afiliationFree: $scope.afiliation,
			afiliationFromList: $scope.afiliationId,
			borderLocationFree: $scope.border,
			borderLocationFromList: $scope.borderId,
			contactCountry: $scope.countryId,
			phoneLocalNumber: $scope.phone,
			email: $scope.email
		};

		$http({
	        method: 'POST',
	        url: 'register/',
	        data: {
				contact: newContact,
				captchaToken: token
			}
	    }).success(function (result) {
	    	console.log(result);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    	$scope.displayError(data.Error);
	    });
	}
}


eacApp.controller('titleCtrl', function ($scope) {
    $scope.title = 'The Project';
	$scope.sections = {
		'section-the-project': {
			id: 'section-the-project',
			title: 'The Project',
			extendedTitle: 'The Project' ,
			controllerId: null},
		'section-edirectory': {
			id: 'section-edirectory',
			title: 'Women EAC Network Directory',
			extendedTitle: 'The Women EAC Network: the E-Directory of women owned firms',
			controllerId: 'eDirectoryController'},
		'section-contacts': {
			id: 'section-contacts',
			title: 'EAC Business Contacts',
			extendedTitle: 'Contacts: Trade Support Institutions, Women Associations, Trade Hubs, and Border Agencies in EAC',
			controllerId: 'contactsController'},
		'section-resources': {
			id: 'section-resources',
			title: 'Publications, Resources and downloads',
			extendedTitle: 'Resources: Agricultural Model Contracts, Tools and training materials',
			controllerId: 'resourcesController'},
		'section-events': {
			id: 'section-events',
			title: 'Events in EAC',
			extendedTitle: 'Events: training and participation to Trade Fairs',
			controllerId: 'eventsController'}
	};
	$scope.currentSection = 'section-the-project';

	$scope.changeContent = function(id) {
		$scope.currentSection = id;
		$scope.title = $scope.sections[id].extendedTitle;
		var controllerId = $scope.sections[id].controllerId;
		if (controllerId != null) {
			angular.element(document.getElementById(controllerId)).scope().init();
		}
	};

	$scope.isVisible = function(id) {
		return id == $scope.currentSection;
	};

	$scope.init = function () {
		$('.sort').click(function (event) {
        	var $rel = $(this).attr('rel');

			var $selector = $("." + $rel);
			if ($selector.is(":hidden")) {
				$selector.slideDown('slow', function () {}).addClass('open');
			} else {
				$selector.removeClass('open').slideUp();
			}
			event.stopPropagation();
			return false;
		});
	}
});
