angular.module('SmartMetals.dashboard.showUnits', [])
  .directive('showUnits', function() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'dashboard/directives/showUnits/showUnits.tpl.html',
      link: function($scope, iElm, iAttrs, controller) {}
    };
  });
