angular.module('SmartMetals.dashboard', [
  'ui.router',
  'restangular'
]).controller('DashboardCtrl', function DashboardCtrl($scope, $rootScope, Restangular, ServerErrors) {
  // Intitalize default models
  var defaultLoad = {
    token: $rootScope.token
  };
  var defaultUnit = {
    token: $rootScope.token
  };
  var dashboardCtrl = this;
  dashboardCtrl.load = angular.copy(defaultLoad);
  dashboardCtrl.unit = angular.copy(defaultUnit);

  // Get the list of loads under account
  $scope.$on('currentUserRetrieved', function(event, currentUser) {
    $scope.currentUser = currentUser;
    dashboardCtrl.loads = Restangular.one('accounts', currentUser.account_id).getList('loads', {
      token: $rootScope.token
    }).$object;
  });

  dashboardCtrl.createLoad = function() {
    var date = new Date();
    Restangular.one('accounts', $scope.currentUser.account_id).post('loads', {
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

});
