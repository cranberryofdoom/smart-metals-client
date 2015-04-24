angular.module('focus', []).directive('focus', function($timeout, $parse) {
  return {
    restrict: 'A',
    link: function($scope, iElm, iAttrs, controller) {
      var focus = $parse(iAttrs.focus);
      $scope.$watch(focus, function(focus) {
        if (focus === true) {
          $timeout(function() {
            iElm[0].focus();
          });
        }
      });
    }
  };
});
