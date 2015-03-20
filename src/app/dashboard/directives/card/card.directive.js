angular.module('SmartMetals.dashboard.card', [])
  .directive('card', function() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'dashboard/directives/card/card.tpl.html',
      link: function($scope, iElm, iAttrs, controller) {}
    };
  });
