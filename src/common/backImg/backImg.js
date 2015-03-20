angular.module('backImg', [])
  .directive('backImg', function() {
    return {
      scope: true,
      link: function($scope, element, attrs) {
        var url = attrs.backImg;
        $scope.$watch(function($scope) {
          return $scope.load.open;
        }, function(open) {
          if (open) {
            element.css({
              'background-image': 'none'
            });
          } else {
            element.css({
              'background-image': 'url(' + url + ')',
              'background-size': 'cover'
            });
          }
        });
      }
    };
  });
