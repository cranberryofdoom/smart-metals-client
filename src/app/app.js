angular.module('SmartMetals', [
  'templates-app',
  'SmartMetals.navbar',
  'SmartMetals.logIn',
  'SmartMetals.alerts',
  'SmartMetals.users',
  'ui.router',
  'restangular',
  'formValidation'
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

.run(function run($rootScope, $window, Restangular, $state) {
  var token = $window.localStorage.token;
  $rootScope.show = false;
  $rootScope.currentUser = {
    email: null,
    id: null,
    firstname: null,
    lastname: null,
    role: null,
    account_id: null
  };
  if (token !== undefined) {
    Restangular.one('users').customGET('current', {
      token: token
    }).then(function(res) {
      $rootScope.currentUser = {
        email: res.email,
        id: res.id
      };
      $rootScope.show = true;
      $state.go('users');
    }, function(res) {
      delete $window.localStorage.token;
      $rootScope.show = false;
    });

  } else {
    $rootScope.show = false;
  }
})

.controller('AppCtrl', function AppCtrl($scope, $rootScope, $window, Restangular) {

  // Change the page title to the respective page
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | SmartMetals';
    }
  });

  // If there is a token, get the information about the user
  // and assign it to the currentUser

  $scope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
    $rootScope.show = true;
  };

  $scope.signOut = function() {
    delete $window.localStorage.token;
    $rootScope.show = false;
    $scope.$broadcast('ALERT', {
      type: "success",
      message: appCtrl.currentUser.email + " successfully signed out."
    });
    $state.go('logIn');
  };
});
