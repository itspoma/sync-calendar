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
    'domReady': '/vendor/domReady/domReady',
    'fullcalendar': '/vendor/fullcalendar/dist/fullcalendar.min',
    'angular': '/vendor/angular/angular.min',
    'ngAria': '/vendor/angular-aria/angular-aria.min',
    'ngResource': '/vendor/angular-resource/angular-resource.min',
    'ngAnimate': '/vendor/angular-animate/angular-animate.min',
    'ngMaterial': '/vendor/angular-material/angular-material.min'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'moment': {
      exports: 'moment'
    },
    'jquery': {
      exports: '$'
    },
    'fullcalendar': {
      exports: 'fullcalendar',
      deps: ['jquery']
    },
    'ngAria': ['angular'],
    'ngResource': ['angular'],
    'ngAnimate': ['angular'],
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