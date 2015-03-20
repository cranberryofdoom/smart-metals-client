angular.module('SmartMetals.dashboard.createImageForm', [])
  .directive('createImageForm', function() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'dashboard/directives/createImageForm/createImageForm.tpl.html',
      link: function($scope, iElm, iAttrs, controller) {}
    };
  });
