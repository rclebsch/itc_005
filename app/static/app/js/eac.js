var eacApp = angular.module('eacApp', ['ngRoute','ngTable','ngAnimate','ngDialog','ui.bootstrap', 'ngMaterial', 'hm.readmore']);

eacApp.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-table/filters/text.html',       '<input type="text" placeholder="Type filter" ng-model="params.filter()[name]" name="{{name}}" ng-disabled="$filterRow.disabled" ng-if="filter == \'text\'" class="input-filter form-control" />');
    $templateCache.put('ng-table/filters/type-ahead.html', '<input type="text" placeholder="Type filter" ng-model="params.filter()[name]" name="{{name}}" ng-table-select-filter-ds="$column" uib-typeahead="data.title for data in $selectData | filter:$viewValue | limitTo:100" typeahead-min-length="0" class="filter filter-select form-control">');
}]);

eacApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

function sortAlphabetically(a, b) {
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
    return 0;
}

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

eacApp.controller('headerCtrl', function ($scope, $rootScope, ngDialog) {
	$scope.initialized = false;
	$scope.events = [];
    $scope.queryString = '';

	$scope.init = function(){
		console.log('headerCtrl.init');
		if ($scope.initialized) {
			return;
		}
		$scope.initialized = true;
	};

    $scope.search = function() {
        if ($scope.queryString.length > 0) {
            $rootScope.$broadcast('search', $scope.queryString);
            $rootScope.$broadcast('forceContent', 'section-search');
        }
    }

    $scope.openHelp = function() {
		ngDialog.open({
			template: 'searchHelpId',
			className: 'ngdialog-theme-default'
		});
	};
});

eacApp.controller('theProjectContentCtrl', theProjectContentCtrl);

function theProjectContentCtrl ($scope) {
	$scope.initialized = false;
    $scope.menuStructure = {
        id:'section-the-project',
        hasSubItems: true,
        title: 'About the project',
        extendedTitle: 'Trade facilitation support for women cross-border traders and MSMEs in East African Community (EAC)',
        subItems:[
            {title:'Mission', bookmark:'bookmark1'},
            {title:'Objectives', bookmark:'bookmark2'},
            {title:'Results and achievements', bookmark:'bookmark3'},
            {title:'Success Stories', bookmark:'bookmark4'},
            {title:'Support us', bookmark:'bookmark5'}
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

function eventsContentCtrl ($scope, $http, $filter, NgTableParams) {
	$scope.initialized = false;
	$scope.events = [];
    $scope.data = [];
    $scope.dates = [];
    $scope.countries = [];
    $scope.locations = [];
    $scope.total = 0;
    $scope.menuStructure = {
        id:'section-events',
        hasSubItems: false,
        title: 'Events in EAC',
        extendedTitle: 'Events: training and participation to Trade Fairs'};
    $scope.currentFilter = 'All';
    $scope.eventsTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                getData: function (params) {
                    var filters = params.filter();
                    if (!angular.equals(filters, {}) && ($scope.currentFilter == 'All')) {
                        $scope.currentFilter = "Filtered";
                    }
                    var filteredData = !angular.equals(filters, {}) ? $filter('filter')($scope.events, filters) : $scope.events;
                    var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    return $scope.data;
                }
            });

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-events') {
            $scope.init();
        }
    });

    $scope.resetFilters = function() {
        $scope.eventsTable.filter({});
        $scope.currentFilter = 'All';
    };

    $scope.buildFilters = function(result) {
        var datesHash = [];
        var countriesHash = [];
        var locationsHash = [];
        $scope.dates.length = 0;
        $scope.countries.length = 0;
        $scope.locations.length = 0;
        result.forEach(function(event) {
            if(countriesHash.indexOf(event.eventCountry) < 0) {
                countriesHash.push(event.eventCountry);
                $scope.countries.push({id:event.eventCountry, title:event.eventCountry});
            }
            var dateObj = new Date(event.eventDateStart);
            var theDate = dateObj.getFullYear() + '-' + ('0' +(dateObj.getMonth()+1)).slice(-2);
            if(datesHash.indexOf(theDate) < 0) {
                datesHash.push(theDate);
                $scope.dates.push({id:theDate, title:theDate});
            }
            if(locationsHash.indexOf(event.eventLocation) < 0) {
                locationsHash.push(event.eventLocation);
                $scope.locations.push({id:event.eventLocation, title:event.eventLocation});
            }
            event.start = dateObj.getFullYear() + '-' + ('0' +(dateObj.getMonth()+1)).slice(-2) + '-' + ('0' +(dateObj.getUTCDate())).slice(-2);
            dateObj = new Date(event.eventDateEnd);
            event.end = dateObj.getFullYear() + '-' + ('0' +(dateObj.getMonth()+1)).slice(-2) + '-' + ('0' +(dateObj.getUTCDate())).slice(-2);
        });
        $scope.countries.sort(sortAlphabetically);
        $scope.dates.sort(sortAlphabetically);
        $scope.locations.sort(sortAlphabetically);
    };

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
            $scope.total = result.length;
            $scope.buildFilters(result);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('eDirectoryContentCtrl', eDirectoryContentCtrl);

function eDirectoryContentCtrl ($scope, $http, $filter, NgTableParams, ngDialog) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.menuStructure = {
        id:'section-edirectory',
        hasSubItems: true,
        title: 'The Women EAC Trade & Logistics Network',
        extendedTitle: 'The E-Directory of Women owned firms & Logistic Service Providers (LSPs) in EAC'};
    $scope.countries = [];
    $scope.borders = [];
    $scope.afiliations = [];
    $scope.activities = [];
    $scope.categories = [];
    $scope.members = 0;
    $scope.businessContactsTotal = 0;
    $scope.currentFilter = 'All';
    $scope.directoryTable = new NgTableParams({
                page: 1,
                count: 100,
            }, {
                total: 1,  // value less than count hide pagination
                getData: function (params) {
                    var filters = params.filter();
                    if (!angular.equals(filters, {}) && ($scope.currentFilter == 'All')) {
                        $scope.currentFilter = "Filtered";
                    }
                    var filteredData = !angular.equals(filters, {}) ? $filter('filter')($scope.contacts, filters) : $scope.contacts;
                    var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    return $scope.data;
                }
            });

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-edirectory') {
            $scope.init();
        }
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-edirectory') {
            angular.extend($scope.directoryTable.filter(),(data.filter) ? {contactCategory:data.filter}:{});
            $scope.currentFilter = (data.filter == '') ? 'All': data.filter;
        }
    });

    $scope.resetFilters = function() {
        $scope.directoryTable.filter({});
        $scope.currentFilter = 'All';
    };

    $scope.$on('incBusinessContacts', function(event, data) {
        $scope.businessContactsTotal += data;
    });

    $scope.buildFilters = function(result) {
        var countriesHash = [];
        var bordersHash = [];
        var afiliationsHash = [];
        var activitiesHash = [];
        var categoriesHash = [];
        $scope.countries.length = 0;
        $scope.borders.length = 0;
        $scope.afiliations.length = 0;
        $scope.activities.length = 0;
        $scope.categories.length = 0;
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
            if(categoriesHash.indexOf(contact.contactCategory) < 0) {
                categoriesHash.push(contact.contactCategory);
                $scope.categories.push({id:contact.contactCategory, title:contact.contactCategory});
            }
        });
        $scope.countries.sort(sortAlphabetically);
        $scope.borders.sort(sortAlphabetically);
        $scope.afiliations.sort(sortAlphabetically);
        $scope.activities.sort(sortAlphabetically);
        $scope.categories.sort(sortAlphabetically);
    };

    $scope.buildSubMenus = function() {
		var subItems = [];
        subItems.push({title:'All', filter:''});
		$scope.categories.forEach(function(category){
            subItems.push({title:category.id, filter:category.id});
        });
		$scope.menuStructure.subItems = subItems;
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
            $scope.members = result.length;
            $scope.businessContactsTotal += $scope.members;
            $scope.buildFilters(result);
            $scope.buildSubMenus();
            $scope.$emit('controllerReady', $scope.menuStructure);
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

function contactsContentCtrl ($scope, $http, $filter, NgTableParams) {
	$scope.initialized = false;
	$scope.contacts = [];
    $scope.data = [];
    $scope.countries = [];
    $scope.borders = [];
    $scope.categories = [];
    $scope.members = 0;
    $scope.menuStructure = {
        id:'section-contacts',
        hasSubItems: true,
        title: 'EAC Business Contacts',
        extendedTitle: 'Contacts: Trade Support Institutions, Women Associations, Trade Hubs, and Border Agencies in EAC'};
    $scope.currentFilter = 'All';
    $scope.contactsTable = new NgTableParams({
                page: 1,
                count: 100
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function (params) {
                    var filters = params.filter();
                    if (!angular.equals(filters, {}) && ($scope.currentFilter == 'All')) {
                        $scope.currentFilter = "Filtered";
                    }
                    var filteredData = !angular.equals(filters, {}) ? $filter('filter')($scope.contacts, filters) : $scope.contacts;
                    var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    return $scope.data;
                }
            });

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-contacts') {
            $scope.init();
        }
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-contacts') {
            angular.extend($scope.contactsTable.filter(),(data.filter) ? {contactCategory:data.filter}:{});
            $scope.currentFilter = (data.filter == '') ? 'All': data.filter;
        }
    });

    $scope.resetFilters = function() {
        $scope.contactsTable.filter({});
        $scope.currentFilter = 'All';
    };

	$scope.buildFilters = function(result) {
        var countriesHash = [];
        var bordersHash = [];
        var categoriesHash = [];
        $scope.countries.length = 0;
        $scope.borders.length = 0;
        $scope.categories.length = 0;
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
        $scope.countries.sort(sortAlphabetically);
        $scope.borders.sort(sortAlphabetically);
        $scope.categories.sort(sortAlphabetically);
    };

	$scope.buildSubMenus = function() {
		var subItems = [];
        subItems.push({title:'All', filter:''});
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
			$scope.members = result.length;
            $scope.buildFilters(result);
			$scope.buildSubMenus();
            $scope.$emit('controllerReady', $scope.menuStructure);
            $scope.$parent.$broadcast('incBusinessContacts', $scope.members);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data, status, headers, config);
	    });
	};

    $scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('searchContentCtrl', searchContentCtrl);

function searchContentCtrl ($scope, $http, $filter, NgTableParams) {
	$scope.initialized = false;
    $scope.searchResults = [];
    $scope.data = [];
    $scope.resultsSummary = 'Search results';
    $scope.menuStructure = {
        id:'section-search',
        hasSubItems: false,
        title: 'Search',
        extendedTitle: '',
    };

    $scope.searchTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function (params) {
                    var filteredData = params.sorting() ? $filter('orderBy')($scope.searchResults, params.orderBy()) : $scope.searchResults;
                    var sortedData = params.filter() ? $filter('filter')(filteredData, params.filter()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    return $scope.data;
                }
            });

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-search') {
            $scope.init();
        }
    });

    $scope.search = function(query) {
         $http({
	        method: 'GET',
	        url: 'search?query_string='+query
	    }).success(function (results) {
	    	$scope.searchResults = $scope.processResults(results);
            $scope.searchTable.reload();
			$scope.initialized = true;
            $scope.resultsSummary = 'Search results: ' + $scope.searchResults.length + ' matches for query "' + query + '"';
	    }).
	    error(function(data, status, headers, config){
	    	console.log(query, status, headers, config);
            $scope.resultsSummary = 'Search request failed. Please try again.';
	    });
    };

    $scope.$on('search', function(event, data) {
        $scope.search(data);
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-search') {
            $scope.search(data.filter);
        }
    });

    $scope.processResults = function(results) {
        var searchResults = [];
        results.forEach(function(result) {
            if (result.type == 1) {
                searchResults.push($scope.buildContactResult(result))
            } else if (result.type == 2) {
                searchResults.push($scope.buildEventResult(result))
            } else if (result.type == 3) {
                searchResults.push($scope.buildResourceResult(result))
            }
        });
        return searchResults;
    };

    $scope.buildContactResult = function(contact) {
        contact.name = (contact.isIndividual) ?
                        contact.firstName + ' ' + contact.lastName :
                        contact.organizationName + ((contact.firstName) ? ' (' + contact.firstName + ' ' + contact.lastName + ')' : '');
        contact.location = contact.contactCountry + (contact.borderLocationFromList ? (', ' + contact.borderLocationFromList ) : '');
        contact.activity = (contact.isIndividual) ? ' ' + ((contact.activityFromList) ? contact.activityFromList : '') + ' (' + contact.contactAfiliationFromList + ')' : '';
        var infos = [];
        if (contact.phoneLocalNumber) infos.push('+' + contact.phonePrefix + ' ' + contact.phoneLocalNumber);
        if (contact.email) infos.push(contact.email);
        contact.contactInfo = infos.join(' | ');
        contact.details = ['contact', contact.name, contact.location, contact.activity, contact.contactInfo, contact.lastUpdate].join(' ');
        contact.firstPagePicture = '';
        return contact;
    };

    $scope.buildEventResult = function(event) {
        event.location = event.eventCountry + ', ' + event.eventLocation;
        event.details = ['event', event.location, event.eventDateStart, event.title, event.objectives, event.eventCoverage, event.beneficiaries, event.contactInfo].join(' ');
        event.firstPagePicture = '';
        return event;
    };

    $scope.buildResourceResult = function(resource) {
        resource.details = ['resource', resource.language, resource.resourceCategory, resource.title, resource.description, resource.timestamp].join(' ');
        return resource;
    };

	$scope.$emit('controllerReady', $scope.menuStructure);
}

eacApp.controller('resourcesContentCtrl', resourcesContentCtrl);

function resourcesContentCtrl ($scope, $http, $filter, NgTableParams) {
	$scope.initialized = false;
	$scope.resources = [];
    $scope.data = [];
    $scope.menuStructure = {
        id:'section-resources',
        hasSubItems: true,
        title: 'Publications, Resources and downloads',
        extendedTitle: 'Resources: Agricultural Model Contracts, Tools and training materials'};
    $scope.categories = [];
    $scope.languages = [];
    $scope.total = 0;
    $scope.currentFilter = 'All';
    $scope.resourcesTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: 1,  // value less than count hide pagination
                //total: $scope.events.length,
                getData: function (params) {
                    var filters = params.filter();
                    if (!angular.equals(filters, {}) && ($scope.currentFilter == 'All')) {
                        $scope.currentFilter = "Filtered";
                    }
                    var filteredData = !angular.equals(filters, {}) ? $filter('filter')($scope.resources, filters) : $scope.resources;
                    var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
                    $scope.data = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(sortedData.length);
                    return $scope.data;
                }
            });

    $scope.$on('changeContent', function(event, data) {
        if(data == 'section-resources') {
            $scope.init();
        }
    });

    $scope.$on('filter', function(event, data) {
        if(data.section == 'section-resources') {
            angular.extend($scope.resourcesTable.filter(),(data.filter) ? {resourceCategory:data.filter}:{});
            $scope.currentFilter = (data.filter == '') ? 'All': data.filter;
        }
    });

    $scope.resetFilters = function() {
        $scope.resourcesTable.filter({});
        $scope.currentFilter = 'All';
    };

	$scope.buildFilters = function(result) {
        var languagesHash = [];
        var categoriesHash = [];
        $scope.categories.length = 0;
        $scope.languages.length = 0;
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
        $scope.languages.sort(sortAlphabetically);
        $scope.categories.sort(sortAlphabetically);

    };

    $scope.buildSubMenus = function() {
		var subItems = [];
        subItems.push({title:'All', filter:''});
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
            $scope.total = result.length;
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

eacApp.controller('titleCtrl', function ($scope, $location, $anchorScroll, $rootScope, ngDialog) {
    $scope.title = 'THE PROJECT';
    $scope.initialSections = [];
    $scope.initialFilter = null;
    $scope.currentSection = null;
	$scope.sections = {};

	$scope.changeContent = function(id, visible) {
		console.log('changeContent: ' + id, visible);
        if (visible) {
            $scope.currentSection = id;
            $scope.title = $scope.sections[id].extendedTitle;
            ga('send', 'event', id);
            $(window).scrollTop(0);
        }
        $rootScope.$broadcast('changeContent', id);
	};

	$scope.isVisible = function(id) {
		return ($scope.currentSection != null) && (id == $scope.currentSection);
	};

	$scope.routeUrl = function(section) {
        console.log('routeUrl', $scope.initialSections, section);
        if ($scope.initialSections[0] == section) {
            $scope.changeContent(section, true);
            if ($scope.initialFilter) {
                $rootScope.$broadcast('filter', {section:section, filter:$scope.initialFilter});
            }
            if($scope.initialSections.length > 1) {
                $scope.changeContent($scope.initialSections[1], false);
            }
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
        var params = $location.search();
        if (params['s'] != null) {
            $scope.initialSections.push(params['s']);
            $scope.initialFilter = params['filter'] ? params['filter'] : null;
        }

        if ($scope.initialSections.length == 0) {
            $scope.initialSections.push('section-edirectory');
            $scope.initialSections.push('section-contacts');
        }
	};

    $scope.init();

    $scope.$on('controllerReady', function(event, data) {
        console.log('controllerReady', data.id);
        $scope.sections[data.id] = data;
        $scope.routeUrl(data.id);
    });

    $scope.$on('forceContent', function(event, data) {
        $scope.changeContent(data, true);
    });

    $scope.subMenuAction = function (action) {
        if (action.bookmark != null) {
            $anchorScroll(action.bookmark);
        } else if (action.filter != null) {
            $rootScope.$broadcast('filter', {section:$scope.currentSection, filter:action.filter});
        }
    };

    $scope.openRegister = function() {
        ga('send', 'event', 'open-register');
		ngDialog.open({
			template: 'registerId',
			controller: 'registerCtrl',
			className: 'ngdialog-theme-default'
		});
	};
});
