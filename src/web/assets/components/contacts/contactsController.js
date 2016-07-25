define(['angular', 'underscore'], function (ng, _) {
  'use strict';

  var ctrl = ng.module('contacts', []);

  ctrl.controller('contactsCtrl', function ($scope, $http, $mdDialog, $timeout, Contacts) {
    var that = this;

    $scope.showDialog = function (data) {
      data = data || {};

      $mdDialog.show({
        parent: ng.element(document.body),
        scope: $scope,
        preserveScope: true,
        templateUrl: 'contact.tpl.html',
        clickOutsideToClose: false,
        clickEscapeToClose: true,
        controllerAs: 'dialog',
        controller: function DialogController($scope, $mdDialog) {
          var dialog = this;

          var contact = _.extend({
            name: '',
          }, data);

          $scope.contact = contact;
          $scope.isNew = typeof contact.id == 'undefined';

          dialog.close = function() {
            $mdDialog.hide();
          }

          dialog.save = function () {
            var contact = new Contacts({});

            contact.id = $scope.contact.id;
            contact.enabled = !!$scope.contact.enabled;
            contact.name = $scope.contact.name;

            contact[$scope.isNew ? '$save' : '$update'](function () {
              dialog.close();
              that.refresh();
            });
          }

          dialog.confirmDelete = function () {
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Are you sure you want to delete the "' + $scope.contact.name + '" contact?')
              .ok('Yes, delete')
              .cancel('No, keep this contact');

            $mdDialog.show(confirm).then(function() {
              dialog.delete();
            });
          }

          dialog.delete = function () {
            Contacts.delete({contactId: $scope.contact.id}, function (contact) {
              dialog.close();
              that.refresh();
            });
          }
        }
      });
    }

    that.refresh = function () {
      Contacts.query(function (response) {
        var contacts = response.data.contacts;

        that.contacts = contacts;
      });
    }

    that.add = function () {
      $scope.showDialog();
    }

    that.edit = function (contactId) {
      Contacts.get({contactId: contactId}, function (contact) {
        $scope.showDialog(contact);
      });
    }

  });

})