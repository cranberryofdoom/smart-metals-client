angular.module('SmartMetals', [
  'templates-app',
  'SmartMetals.router',
  'SmartMetals.navbar',
  'SmartMetals.logIn',
  'SmartMetals.alerts',
  'SmartMetals.users',
  'SmartMetals.accounts',
  'SmartMetals.dashboard',
  'ui.router',
  'restangular',
  'formValidation',
  'authentication'
])

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://smartmetals-api.herokuapp.com/api/v1');
})

// If a route does not match our defined routes,
// redirect to the following route
.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/log_in');
})

// Handles CORS
.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
})

// Handle setting the current user and getting and
// setting the authentication token for authorized requests
.run(function run($rootScope, $window, Restangular, $state, Authentication) {
  $rootScope.token = $window.localStorage.token;
  $rootScope.show = false;
  $rootScope.currentUser = false;
  // Set it so that all methods from now on get
  // to send authorized requests
  Restangular.setDefaultRequestParams({
    token: $rootScope.token
  });
  // Use the token if it can be found to get
  // the current user
  if ($rootScope.token !== undefined) {
    Authentication.getCurrentUser($rootScope.token);
  } else {
    $rootScope.show = false;
  }
})

.controller('AppCtrl', function AppCtrl($scope, $rootScope, $state, $window, Restangular) {

  // Change the page title to the respective page
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | SmartMetals';
    }
  });

  $scope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
    $rootScope.show = true;
  };

  $scope.signOut = function() {
    delete $window.localStorage.token;
    $rootScope.show = false;
    $scope.$broadcast('ALERT', {
      type: "success",
      message: $rootScope.currentUser.email + " successfully signed out."
    });
    $state.go('logIn');
  };
});
