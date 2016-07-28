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
  'ngLetterAvatar',
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
    'ngLetterAvatar',
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

  angular.module('app').directive('myUserAvatar', function () {
    var configsMap = {
      'default': {
        charCount: '2',
        height: '30',
        width: '30',
        fontWeight: '100',
        fontSize: '13',
        avatarBorder: 'false',
        shape: 'round'
      },
      'test': {
        fontSize: '10'
      }
    };

    return {
      restrict: 'E',
      scope: {
        config: '=config',
        data: '=data'
      },
      template: function (elem, attrs) {
        var config = $.extend({},
          configsMap['default'],
          configsMap[attrs.config] || {}
        );

        return '<ng-letter-avatar ' +
          ' data="{{ data }}" ' +
          ' shape="' + config.shape + '" ' +
          ' charCount="' + config.charCount + '" ' +
          ' avatarborder="' + config.avatarBorder + '" ' +
          ' height="' + config.height + '" ' +
          ' width="' + config.width + '" ' +
          ' fontWeight="' + config.fontWeight + '" ' +
          ' fontsize="' + config.fontSize + '"' + 
          '></ng-letter-avatar>';
      }
    };
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