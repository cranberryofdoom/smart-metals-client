angular.module('SmartMetals.alerts', [
  'ui.router',
  'plusOne',
  'ui.bootstrap'
])

.controller('AlertCtrl', function AlertController($scope) {

  // Initalize current alerts array
  $scope.alerts = [];

  // Success alerts
  $scope.$on('ALERT', function(event, data) {
    if ($scope.alerts.length > 0) {
      $scope.alerts.length = 0;
    }
    $scope.alerts.push({
      type: data.type,
      message: data.message
    });
  });

  // Close alert
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
})

.directive('alerts', function() {
  return {
    templateUrl: 'alerts/alerts.tpl.html'
  };
});
