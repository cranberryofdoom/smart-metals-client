angular.module('SmartMetals.dashboard', [
    'ui.router',
    'restangular',
    'formValidation',
    'authentication',
    'SmartMetals.dashboard.createImageForm',
    'SmartMetals.dashboard.createUnitForm',
    'SmartMetals.dashboard.showUnits',
    'SmartMetals.dashboard.card'
  ])
  .controller('DashboardCtrl', function DashboardCtrl($scope, $rootScope, $state, Restangular, ServerErrors, Authentication, Image, Load, Unit) {
    // Intitalize default models
    var defaultLoad = {};
    var defaultUnit = {};
    var dashboardCtrl = this;

    var account;
    dashboardCtrl.load = angular.copy(defaultLoad);
    dashboardCtrl.unit = angular.copy(defaultUnit);

    if ($rootScope.currentUser) {
      getLoadsAndUnits($rootScope.currentUser.account_id);
    }

    $scope.$on('currentUserRetrieved', function(event, currentUser) {
      getLoadsAndUnits(currentUser.account_id);
    });

    // Get the list of loads and units under account
    function getLoadsAndUnits(accountId) {
      account = Restangular.one('accounts', accountId);
      // Get all loads and units for each load
      Load.getLoads(account).then(function(res) {
        dashboardCtrl.loads = res;
      }, function(res) {
        $rootScope.$broadcast('ALERT', {
          type: "danger",
          message: "Failed to get the loads for this account."
        });
      });
    }

    dashboardCtrl.resetForm = function(form, index) {
      dashboardCtrl.load = angular.copy(dashboardCtrl.defaultload);
      dashboardCtrl.loads[index].create = false;
      form.$setPristine();
      form.$setUntouched();
    };

    // Create a new load
    dashboardCtrl.createLoad = function() {
      Load.createLoad(dashboardCtrl.loads).then(function(res) {
        dashboardCtrl.loads.push(res);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: res.date + "'s load successfully created."
        });
      }, function(error) {
        ServerErrors.inlineErrors(error, null);
      });
    };

    // Delete a load
    dashboardCtrl.deleteLoad = function(load, index) {
      Load.deleteLoad(load).then(function(res) {
        dashboardCtrl.loads.splice(index, 1);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: load.date + "'s load successfully deleted."
        });
      }, function(error) {
        $rootScope.$broadcast('ALERT', {
          type: "danger",
          message: "Could not create load."
        });
      });
    };

    dashboardCtrl.editLoad = function(load, index, date) {
      if (date !== undefined && load.edit === true) {
        load.date = date;
        Load.editLoad(load).then(function(res) {
          if (res) {
            dashboardCtrl.loads[index].date = date;
            $rootScope.$broadcast('ALERT', {
              type: "success",
              message: "Load successfully updated to " + date + "."
            });
          } else {
            $rootScope.$broadcast('ALERT', {
              type: "danger",
              message: "Could not edit load."
            });
          }
        }, function(error) {
          $rootScope.$broadcast('ALERT', {
            type: "danger",
            message: "Could not edit load."
          });
        });
      }
      load.edit = !load.edit;
    };

    dashboardCtrl.showUnits = function(load) {
      load.open = !load.open;
      Unit.getUnits(load).then(function(res) {
        load.units = res;
      }, function(error) {
        $rootScope.$broadcast('ALERT', {
          type: "danger",
          message: "Failed to get the loads for this account."
        });
      });
    };

    // Create a new unit
    dashboardCtrl.createUnit = function(unit, load, form) {
      // Check if form is valid first
      if (form.$valid) {
        Unit.createUnit(unit, load).then(function(res) {
          load.units.push(res);
          load.create = false;
          $rootScope.$broadcast('ALERT', {
            type: "success",
            message: "Unit " + res.tag_number + " successfully created."
          });
        }, function(error) {
          ServerErrors.inlineErrors(error, form);
        });
      }
    };

    // Delete a unit
    dashboardCtrl.deleteUnit = function(tag_number, unitId, loadIndex, index) {
      dashboardCtrl.loads[loadIndex].units[index].remove().then(function(res) {
        dashboardCtrl.loads[loadIndex].units.splice(index, 1);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: "Unit " + tag_number + " successfully deleted."
        });
      }, function(error) {
        ServerErrors.inlineErrors(error, null);
      });
    };

    // When a image file is selected, manually
    // update the item model
    $scope.chooseImageFile = function(element) {
      var index = angular.element(element).scope().$index;
      if (index !== undefined) {
        for (var i = 0; i < element.files.length; i++) {
          dashboardCtrl.loads[index]["images[]"].push(element.files[i]);
        }
      } else {}
    };

    dashboardCtrl.createImage = function(load, form) {
      Image.createImage(load).then(function(res) {
        for (var i = 0; i < res.length; i++) {
          load.imageMediumURLs.push(res[i].medium_url);
        }
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: res.image_file_name + " successfully uploaded."
        });
      }, function(error) {
        ServerErrors.inlineErrors(error, form);
      });
    };
  });
