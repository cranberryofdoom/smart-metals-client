angular.module('SmartMetals.dashboard', [
    'ui.router',
    'restangular',
    'formValidation',
    'authentication'
  ])
  .controller('DashboardCtrl', function DashboardCtrl($scope, $rootScope, $state, Restangular, ServerErrors, Authentication) {
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
      account.getList('loads').then(function(res) {
        dashboardCtrl.loads = res;
        // Get all units for each loads
        for (var i = 0; i < dashboardCtrl.loads.length; i++) {
          dashboardCtrl.loads[i].open = false;
          dashboardCtrl.loads[i].units = dashboardCtrl.loads[i].getList('units').$object;
        }
      }, function(res) {
        $rootScope.$broadcast('ALERT', {
          type: "danger",
          message: "Failed to get the loads for this account."
        });
      });
    }

    // Create a new load
    dashboardCtrl.createLoad = function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      dashboardCtrl.loads.post({
        date: year + "-" + month + "-" + day
      }).then(function(res) {
        dashboardCtrl.loads.push(res);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: res.date + "'s load successfully created."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, null);
      });

    };

    // Create a new unit
    dashboardCtrl.createUnit = function(unit, index, form) {
      // Check if form is valid first
      if (form.$valid) {
        dashboardCtrl.loads[index].post("units", unit).then(function(res) {
          dashboardCtrl.loads[index].units.push(res);
          $rootScope.$broadcast('ALERT', {
            type: "success",
            message: res.tag_number + " successfully created."
          });
        }, function(res) {
          ServerErrors.inlineErrors(res, form);
        });
      }
    };

    // Delete a load
    dashboardCtrl.deleteLoad = function(date, loadId, index) {
      dashboardCtrl.loads[index].remove().then(function(res) {
        dashboardCtrl.loads.splice(index, 1);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: date + "'s load successfully deleted."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, null);
      });
    };

    // Delete a unit
    dashboardCtrl.deleteUnit = function(tag_number, unitId, loadIndex, index) {
      dashboardCtrl.loads[loadIndex].units[index].remove().then(function(res) {
        dashboardCtrl.loads[loadIndex].units.splice(index, 1);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: date + "'s load successfully deleted."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, null);
      });
    };
  });
