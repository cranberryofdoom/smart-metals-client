angular.module('SmartMetals', [
  'templates-app',
  'SmartMetals.logIn',
  'SmartMetals.alerts',
  'SmartMetals.users',
  'ui.router',
  'restangular',
  'formValidation'
])

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://smartmetals-api.herokuapp.com/api/v1/auth');
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

// Handles the header token interceptor
.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.run(function run() {})

.controller('AppCtrl', function AppCtrl($scope, $location, $http, $window, $state, Restangular) {

  // Change the page title to the respective page
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | SmartMetals';
    }
  });

  // Initalize models
  var appCtrl = this;
  appCtrl.currentUser = {
    email: null,
    id: null
  };
  appCtrl.show = false;
  var token = $window.localStorage.token;

  // If there is a token, get the information about the user
  // and assign it to the currentUser
  if (token !== undefined) {
    // var decodedToken = jwt_decode(token);
    // Restangular.one('users', decodedToken.adminId).get().then(function(res) {
    //   appCtrl.currentUser = {
    //     email: res.email,
    //     id: res.id
    //   };
    //   appCtrl.show = true;
    // }, function(res) {
    //   delete $window.localStorage.token;
    //   appCtrl.show = false;
    // });

  } else {
    appCtrl.show = false;
  }

  $scope.setCurrentUser = function(user) {
    appCtrl.currentUser = user;
    appCtrl.show = true;
  };

  appCtrl.signOut = function() {
    delete $window.localStorage.token;
    appCtrl.show = false;
    $scope.$broadcast('ALERT', {
      type: "success",
      message: appCtrl.currentUser.email + " successfully signed out."
    });
    $state.go('logIn');
  };
})

// Directive for the navbar
.directive('navbar', function() {
  return {
    templateUrl: 'navbar/navbar.tpl.html'
  };
})

// Adds token to the header if it exists
.factory('AuthInterceptor', function($rootScope, $q, $window) {
  return {
    request: function(config) {
      var token = $window.localStorage.token;
      config.headers = config.headers || {};
      if (token !== undefined) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function(response) {
      if (response.status === 401) {
        $state.go('logIn');
      }
      return response || $q.when(response);
    }
  };
});
