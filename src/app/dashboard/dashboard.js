angular.module('SmartMetals.dashboard', [
  'ui.router',
  'restangular',
  'formValidation'
])

.controller('DashboardCtrl', function DashboardCtrl($scope, $rootScope, Restangular, ServerErrors) {
  // Intitalize default models
  var defaultLoad = {
    token: $rootScope.token
  };
  var defaultUnit = {
    token: $rootScope.token
  };
  var dashboardCtrl = this;
  var account;
  dashboardCtrl.load = angular.copy(defaultLoad);
  dashboardCtrl.unit = angular.copy(defaultUnit);

  // Get the list of loads and units under account
  $scope.$on('currentUserRetrieved', function(event, currentUser) {
    $scope.currentUser = currentUser;
    account = Restangular.one('accounts', currentUser.account_id);
    // Get all loads
    dashboardCtrl.loads = account.getList('loads').$object;
    // Get all units

  });

  // Create a new load
  dashboardCtrl.createLoad = function() {
    var date = new Date();
    account.post('loads', {
      date: date.getYear() + "-" + date.getMonth() + "-" + date.getDate(),
      account_id: $scope.currentUser.account_id,
      token: $rootScope.token
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

  // Delete a load
  dashboardCtrl.deleteLoad = function(date, loadId, index) {
    account.remove('loads', loadId, {
      token: $rootScope.token
    }).then(function(res) {
      dashboardCtrl.loads.splice(index, 1);
      $rootScope.$broadcast('ALERT', {
        type: "success",
        message: date + "'s load successfully deleted."
      });
    }, function(res) {
      ServerErrors.inlineErrors(res, null);
    });
  };

});
