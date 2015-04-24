angular.module('SmartMetals.dashboard.card', [
  'ui.bootstrap'
])

.directive('card', function($timeout) {
  return {
    scope: true,
    restrict: 'E',
    controller: function($scope) {
      $scope.show = 0;
      $scope.right = function(numPhotos) {
        if ($scope.show < numPhotos - 1) {
          $scope.show++;
        }
      };
      $scope.left = function() {
        if ($scope.show > 0) {
          $scope.show--;
        }
      };
      $scope.navigate = function(index) {
        $scope.show = index;
      };
    },
    templateUrl: 'dashboard/directives/card/card.tpl.html',
    link: function($scope, iElm, iAttrs, controller) {
      function setBackImg(url) {
        if (url !== undefined) {
          iElm.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
          });
        }
      }
      $scope.$watch(function($scope) {
        return $scope.show;
      }, function(show) {
        setBackImg($scope.load.imageMediumURLs[show]);
      });
      $scope.$watch(function($scope) {
        return $scope.load.imageMediumURLs;
      }, function(imageMediumURLs) {
        setBackImg($scope.load.imageMediumURLs[0]);
      }, true);
      $scope.$watch(function($scope) {
        return $scope.load.open;
      }, function(open) {
        if (open) {
          iElm.css({
            'background-image': 'none'
          });
        } else if ($scope.load.imageMediumURLs.length > 0) {
          setBackImg($scope.load.imageMediumURLs[0]);
        }
      });
    }
  };
});
