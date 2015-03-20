angular.module('SmartMetals.dashboard.createUnitForm', [])
  .directive('createUnitForm', function() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'dashboard/directives/createUnitForm/createUnitForm.tpl.html',
      link: function($scope, iElm, iAttrs, controller) {}
    };
  });
