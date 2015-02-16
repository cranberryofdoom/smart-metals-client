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
  $rootScope.token = $window.localStorage.token;
  $rootScope.show = false;
  $rootScope.currentUser = {};
  // Use the token if it can be found to get
  // the current user
  if ($rootScope.token !== undefined) {
    // Set it so that all methods from now on get
    // to send authorized requests
    console.log($rootScope.token);
    Restangular.setRestangularFields({
      token: $rootScope.token
    });
    Restangular.one('users').customGET('current').then(function(res) {
      // The server is able to find a current user with the
      // saved token. Save the retrieved current user and
      // make it accessible to all of the controllers.
      $rootScope.currentUser = {
        email: res.email,
        id: res.id,
        firstname: res.firstname,
        lastname: res.lastname,
        role: res.role,
        account_id: res.account_id
      };
      $rootScope.$broadcast('currentUserRetrieved', $rootScope.currentUser);
      $rootScope.show = true;
      $state.go('dashboard');
    }, function(res) {
      // The server was not able to find the current user with
      // the token. Which means the token is either expired or just
      // bad. Delete the token.
      delete $window.localStorage.token;
      $rootScope.show = false;
      $state.go('logIn');
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
