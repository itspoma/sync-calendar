'use strict';

window.debug = (function () {
  return /(127\.|localhost)/.test(location.host);
})();

require.config({
  urlArgs: 'v=' + (debug ? (new Date()).getTime() : version),

  paths: {
    'less': '/vendor/less/dist/less.min',
    'jquery': '/vendor/jquery/dist/jquery.min',
    'moment': '/vendor/moment/min/moment.min',
    'underscore': '/vendor/underscore/underscore-min',
    'domReady': '/vendor/domReady/domReady',
    'fullcalendar': '/vendor/fullcalendar/dist/fullcalendar.min',
    'angular': '/vendor/angular/angular.min',
    'ngAria': '/vendor/angular-aria/angular-aria.min',
    'ngResource': '/vendor/angular-resource/angular-resource.min',
    'ngAnimate': '/vendor/angular-animate/angular-animate.min',
    'ngMaterial': '/vendor/angular-material/angular-material.min',
    'ngContextMenu': '/vendor/angular-bootstrap-contextmenu/contextMenu',
    'ngLoadingBar': '/vendor/angular-loading-bar/build/loading-bar',
  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'moment': {
      exports: 'moment'
    },
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'ngContextMenu': {
      exports: 'contextMenu'
    },
    'fullcalendar': {
      exports: 'fullcalendar',
      deps: ['jquery']
    },
    'ngAria': ['angular'],
    'ngResource': ['angular'],
    'ngAnimate': ['angular'],
    'ngLoadingBar': ['ngAnimate'],
    'ngMaterial': ['angular', 'ngAria', 'ngAnimate']
  },

  priority: ['angular']
});

require(['require', 'angular', 'app'], function(require, ng) {
  if (window.debug) {
    require(['less']);
  }

  require([
    'domReady!'
  ], function (document) {
    // bootstrap angular when dom will be ready
    angular.bootstrap(document, ['app']);
  });
});