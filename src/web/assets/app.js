define([
  'jquery',
  'angular',
  'moment',
  'components/calendar/calendarController',
  'components/contacts/contactsController',
  'ngMaterial',
  'ngResource',
  'fullcalendar',
  'ngLoadingBar',
  // 'ngContextMenu'
], function (
  $, angular, moment
) {
  'use strict';

  // init angular app
  var app = angular.module('app', [
    'ngMaterial',
    'ngResource',
    // 'ui.bootstrap.contextMenu',
    'angular-loading-bar',
    'ngAnimate',
    'calendar',
    'contacts',
  ]);

  // config
  app.config(function($mdDateLocaleProvider, $resourceProvider, $mdThemingProvider, cfpLoadingBarProvider) {
    // don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue')
      .warnPalette('red');

    cfpLoadingBarProvider.includeSpinner = false;

    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD');
    };
  });

  //
  app.controller('pageCtrl', function ($scope, $mdDialog, Events) {
    // $scope.menuOptions = [
    //   ['Select', function ($itemScope) {
    //     // $scope.selected = $itemScope.item.name;
    //   }],
    //   null, // Dividier
    //   ['Remove', function ($itemScope) {
    //     // $scope.items.splice($itemScope.$index, 1);
    //   }]
    // ];
  });

  angular.module('app').factory('Events', function($resource) {
    return $resource('http://127.0.0.1:3000/api/v1/events/:eventId', {
      eventId: '@id'
    }, {
      'query': { method: 'GET', isArray: false },
      'update': { method:'PUT' }
    });
  });

  angular.module('app').factory('Contacts', function($resource) {
    return $resource('http://127.0.0.1:3000/api/v1/contacts/:contactId', {
      contactId: '@id'
    }, {
      'query': { method: 'GET', isArray: false },
      'update': { method:'PUT' }
    });
  });

  return app;
});