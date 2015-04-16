angular.module('SmartMetals.dashboard.showUnits', [])
  .directive('showUnits', function() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'dashboard/directives/showUnits/showUnits.tpl.html',
      link: function($scope, iElm, iAttrs, controller) {
        $scope.$watch(function($scope) {
          console.log($scope.$parent.load.units);
          return $scope.load.unit;
        }, function(unit) {
          console.log(unit);
        });
      }
    };
  });
