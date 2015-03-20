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
  'formDataObject',
  'authentication',
  'backImg',
  'SmartMetals.image',
  'SmartMetals.load',
  'SmartMetals.unit'
])

// Set the baseURL to direct it to where it should be
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

    // Initialize all app-wide variables that need to be tracked.
    // This means: the token, the current user and show (which
    // determines whether the navbar should be shown or not).
    $rootScope.token = $window.localStorage.token;
    $rootScope.show = false;
    $rootScope.currentUser = false;

    // Set Restangular to send all requests with the
    // token
    Restangular.setDefaultRequestParams({
      token: $rootScope.token
    });

    // Use the token if it can be found to get
    // the current user
    if ($rootScope.token !== undefined) {

      // Try to get the current user with the token
      Authentication.getCurrentUser($rootScope.token).then(

        // The current user was sucessfully retrieved with
        // the token. Change the navbar so that it displays
        // the proper user information and notify the other modules
        // that the current user is loaded into the $rootScope.
        function(res) {
          $rootScope.$broadcast('currentUserRetrieved', $rootScope.currentUser);
          $rootScope.show = true;
        },

        // The current user was unsucessfully retrieved with
        // the token. This must mean that the token is either
        // invalid or expired. Delete the token and make sure
        // the token variable matches.
        function(error) {
          delete $window.localStorage.token;
          $rootScope.token = $window.localStorage.token;
        });
    }
  })
  .controller('AppCtrl', function AppCtrl($scope, $rootScope, $state, $window, Restangular, Authentication) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      // Change the page title to the respective page
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle + ' | SmartMetals';
      }
    });

    $scope.signOut = function() {
      Authentication.logOutUser();
      $scope.$broadcast('ALERT', {
        type: "success",
        message: $rootScope.currentUser.email + " successfully signed out."
      });
    };
  });
