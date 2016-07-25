define(['angular', 'moment', 'underscore'], function (ng, moment, _) {
  'use strict';

  var ctrl = ng.module('calendar', []);

  ctrl.controller('calendarCtrl', function ($scope, $http, $mdDialog, $timeout, Events) {

    $scope.refreshEvents = function () {
      $('#calendar').fullCalendar('refetchEvents');
    }

    $scope.showEventOnDateDialog = function (date) {
      $scope.showEventDialog({
        'date': date
      });
    }

    $scope.showEventDialog = function (eventData) {
      eventData = eventData || {};

      $mdDialog.show({
        scope: $scope,
        preserveScope: true,
        parent: ng.element(document.body),
        templateUrl: 'event.tpl.html',
        clickOutsideToClose: false,
        controller: function DialogController($scope, $mdDialog) {
          var event = _.extend({
            enabled: true,
            title: '',
            date: new Date()
          }, eventData);

          event.date = moment(event.date).toDate();

          $scope.event = event;
          $scope.isNew = typeof event.id == 'undefined';

          $scope.closeDialog = function() {
            $mdDialog.hide();
          }

          $scope.save = function () {
            var event = new Events({});

            event.id = $scope.event.id;
            event.enabled = !!$scope.event.enabled;
            event.title = $scope.event.title;
            event.date = moment($scope.event.date).format('YYYY-MM-DD');

            event[$scope.isNew ? '$save' : '$update'](function () {
              $scope.closeDialog();
              $scope.refreshEvents();
            });
          }

          $scope.confirmDelete = function () {
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Are you sure you want to delete the "' + $scope.event.title + '" event?')
              .ok('Yes, delete')
              .cancel('No, keep this event');

            $mdDialog.show(confirm).then(function() {
              $scope.delete();
            });
          }

          $scope.delete = function () {
            Events.delete({eventId: $scope.event.id}, function (event) {
              $scope.closeDialog();
              $scope.refreshEvents();
            });
          }
        }
      });
    }

    $scope.addEvent = function () {
      $scope.showEventDialog();
    }

    $scope.calendarGoPrev = function () {
      $('#calendar').fullCalendar('prev');
    }

    $scope.calendarGoNext = function () {
      $('#calendar').fullCalendar('next');
    }

    $scope.calendarGoToday = function () {
      $('#calendar').fullCalendar('today');
    }

    $('#calendar').fullCalendar({
      header: false,
      displayEventTime: false,
      editable: true,
      loading: function(isLoading, view) {
        if (isLoading == false) {
          var moment = $('#calendar').fullCalendar('getDate');
          $scope.calendarCurrentDate = moment.format();
        }
      },
      events: function(start, end, timezone, callback) {
        Events.query(function (response) {
          var events = response.data.events;

          events.forEach(function (event) {
            if (/ FE/.test(event.title)) {
              event.className = 'frontend';
            }
            
            if (/tickets/.test(event.title)) {
              event.className = 'tickets';
            }
          });

          callback(events);
        });
      },
      eventDrop: function(eventObject, jsEvent, ui, view) {
        Events.get({eventId: eventObject.id}, function (event) {
          event.date = eventObject.start.format();
          event.$update();
        });
      },
      eventClick: function(eventObject, jsEvent, view) {
        Events.get({eventId: eventObject.id}, function (event) {
          $scope.showEventDialog(event);
        });
      },
      dayClick: function (date, jsEvent, view) {
        $scope.showEventOnDateDialog(date.toDate());
      }
    });
    
    $timeout($scope.calendarGoToday, 1000);
  });

})