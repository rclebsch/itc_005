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

eacApp.directive('ngElevateZoom', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.attr('data-zoom-image',attrs.zoomImage);
            if (attrs.ngSrc != "") {
                $(element).elevateZoom();
            }
        }
    };
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

eacApp.controller('theProjectContentCtrl', theProjectContentCtrl);

function theProjectContentCtrl ($scope) {
	$scope.initialized = false;
    $scope.menuStructure = {
        id:'section-the-project',
        title: 'The Project',
        extendedTitle: 'Project',
        subItems:[
            {title:'sub-title1', bookmark:'bookmark1'},
            {title:'sub-title2', bookmark:'bookmark2'},
            {title:'sub-title3', bookmark:'bookmark3'}
        ]
    };

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-the-project') {
            $scope.init();
        }
    });

	$scope.init = function(){
		console.log('theProjectContentCtrl.init');
		if ($scope.initialized) {
			return;
		}
        $scope.initialized = true;
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('eventsContentCtrl', eventsContentCtrl);

function eventsContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
	$scope.events = [];
    $scope.data = [];
    $scope.menuStructure = {
        id:'section-events',
        title: 'Events in EAC',
        extendedTitle: 'Events: training and participation to Trade Fairs'};
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

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-events') {
            $scope.init();
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

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('eDirectoryContentCtrl', eDirectoryContentCtrl);

function eDirectoryContentCtrl ($scope, $http, $filter, ngTableParams, ngDialog) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.menuStructure = {
        id:'section-edirectory',
        title: 'Women EAC Network Directory',
        extendedTitle: 'The Women EAC Network: the E-Directory of women owned firms'};
    $scope.countries = [];
    $scope.borders = [];
    $scope.afiliations = [];
    $scope.activities = [];
    $scope.directoryTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function ($defer, params) {
                    var filteredData = params.filter() ? $filter('filter')($scope.contacts, params.filter()) : $scope.contacts;
                    var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    $defer.resolve($scope.data);
                }
            });

    $scope.$on('changeContent', function(event, data) {
        console.log('eDirectory changeContent', data);
        if(data == 'section-edirectory') {
            $scope.init();
        }
    });

    $scope.buildFilters = function(result) {
        var countriesHash = [];
        var bordersHash = [];
        var afiliationsHash = [];
        var activitiesHash = [];
        result.forEach(function(contact) {
            if(countriesHash.indexOf(contact.contactCountry) < 0) {
                countriesHash.push(contact.contactCountry);
                $scope.countries.push({id:contact.contactCountry, title:contact.contactCountry});
            }
            if(bordersHash.indexOf(contact.borderLocationFromList) < 0) {
                bordersHash.push(contact.borderLocationFromList);
                $scope.borders.push({id:contact.borderLocationFromList, title:contact.borderLocationFromList});
            }
            if(afiliationsHash.indexOf(contact.contactAfiliationFromList) < 0) {
                afiliationsHash.push(contact.contactAfiliationFromList);
                $scope.afiliations.push({id:contact.contactAfiliationFromList, title:contact.contactAfiliationFromList});
            }
            if(activitiesHash.indexOf(contact.activityFromList) < 0) {
                activitiesHash.push(contact.activityFromList);
                $scope.activities.push({id:contact.activityFromList, title:contact.activityFromList});
            }
        });
    };

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
            $scope.buildFilters(result);
	    }).error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

	$scope.openRegister = function() {
        ga('send', 'event', 'open-register');
		ngDialog.open({
			template: 'registerId',
			controller: 'registerCtrl',
			className: 'ngdialog-theme-default'
		});
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('contactsContentCtrl', contactsContentCtrl);

function contactsContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.countries = [];
    $scope.borders = [];
    $scope.categories = [];
    $scope.menuStructure = {
        id:'section-contacts',
        title: 'EAC Business Contacts',
        extendedTitle: 'Contacts: Trade Support Institutions, Women Associations, Trade Hubs, and Border Agencies in EAC'};
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

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-contacts') {
            $scope.init();
        }
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-contacts') {
            angular.extend($scope.contactsTable.filter(), {contactCategory:data.filter});
        }
    });

	$scope.buildFilters = function(result) {
        var countriesHash = [];
        var bordersHash = [];
        var categoriesHash = [];
        result.forEach(function(contact) {
            if(countriesHash.indexOf(contact.contactCountry) < 0) {
                countriesHash.push(contact.contactCountry);
                $scope.countries.push({id:contact.contactCountry, title:contact.contactCountry});
            }
            if(bordersHash.indexOf(contact.borderLocationFromList) < 0) {
                bordersHash.push(contact.borderLocationFromList);
                $scope.borders.push({id:contact.borderLocationFromList, title:contact.borderLocationFromList});
            }
            if(categoriesHash.indexOf(contact.contactCategory) < 0) {
                categoriesHash.push(contact.contactCategory);
                $scope.categories.push({id:contact.contactCategory, title:contact.contactCategory});
            }
        });
    };

	$scope.buildSubMenus = function() {
		var subItems = [];
		$scope.categories.forEach(function(category){
            subItems.push({title:category.id, filter:category.id});
        });
		$scope.menuStructure.subItems = subItems;
	};

	$scope.init = function(){
		console.log('contactsContentCtrl.init');
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
			$scope.buildFilters(result);
			$scope.buildSubMenus();
            $scope.$emit('controllerReady', $scope.menuStructure);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('resourcesContentCtrl', resourcesContentCtrl);

function resourcesContentCtrl ($scope, $http, $filter, ngTableParams) {
	$scope.initialized = false;
	$scope.resources = [];
    $scope.data = [];
    $scope.menuStructure = {
        id:'section-resources',
        title: 'Publications, Resources and downloads',
        extendedTitle: 'Resources: Agricultural Model Contracts, Tools and training materials'};
    $scope.categories = [];
    $scope.languages = [];
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

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-resources') {
            $scope.init();
        }
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-resources') {
            angular.extend($scope.resourcesTable.filter(), {resourceCategory:data.filter});
        }
    });

	$scope.buildFilters = function(result) {
        var languagesHash = [];
        var categoriesHash = [];
        result.forEach(function(contact) {
            if(languagesHash.indexOf(contact.language) < 0) {
                languagesHash.push(contact.language);
                $scope.languages.push({id:contact.language, title:contact.language});
            }
            if(categoriesHash.indexOf(contact.resourceCategory) < 0) {
                categoriesHash.push(contact.resourceCategory);
                $scope.categories.push({id:contact.resourceCategory, title:contact.resourceCategory});
            }
        });
    };

    $scope.buildSubMenus = function() {
		var subItems = [];
		$scope.categories.forEach(function(category){
            subItems.push({title:category.id, filter:category.id});
        });
		$scope.menuStructure.subItems = subItems;
	};

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
            $scope.buildFilters(result);
            $scope.buildSubMenus();
            $scope.$emit('controllerReady', $scope.menuStructure);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
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
	$scope.success = false;
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
			$scope.error = false;
			$scope.success = true;
            ga('send', 'event', 'successful-register');
			grecaptcha.reset();
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    	$scope.displayError(data.Error);
			$scope.success = false;
			grecaptcha.reset();
	    });
	}
}

eacApp.controller('titleCtrl', function ($scope, $location, $anchorScroll, $rootScope) {
    $scope.title = 'The Project';
    $scope.initialSection = null;
    $scope.currentSection = null;
	$scope.sections = {};

	$scope.changeContent = function(id) {
		console.log('changeContent: ' + id);
		$scope.currentSection = id;
		$scope.title = $scope.sections[id].extendedTitle;
        $rootScope.$broadcast('changeContent', id);
        ga('send', 'event', id);
	};

	$scope.isVisible = function(id) {
		return ($scope.currentSection != null) && (id == $scope.currentSection);
	};

	$scope.routeUrl = function(section) {
        console.log('routeUrl', $scope.initialSection, section);
        if ($scope.initialSection == section) {
            $scope.changeContent(section);
        }
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
        $scope.initialSection = $location.search()['s'];
        if ($scope.initialSection == null) {
            $scope.initialSection = 'section-the-project';
        }
	};

    $scope.init();

    $scope.$on('controllerReady', function(event, data) {
        console.log('controllerReady', data.id);
        $scope.sections[data.id] = data;
        $scope.routeUrl(data.id);
    });

    $scope.subMenuAction = function (action) {
        if (action.bookmark != null) {
            $anchorScroll(action.bookmark);
        } else if (action.filter != null) {
            $rootScope.$broadcast('filter', {section:$scope.currentSection, filter:action.filter});
        }
    };
});
