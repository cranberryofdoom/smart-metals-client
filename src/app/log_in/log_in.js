angular.module('SmartMetals.logIn', [
  'ui.router',
  'restangular'
])

.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('logIn', {
    url: '/log_in',
    views: {
      "main": {
        templateUrl: 'log_in/log_in.tpl.html'
      }
    },
    data: {
      pageTitle: 'Log In'
    }
  });
}])

.controller('LogInCtrl', function LogInController($scope, $rootScope, $state, AuthService, Restangular, ServerErrors) {
  var logInCtrl = this;
  logInCtrl.user = {
    email: '',
    password: ''
  };

  logInCtrl.logIn = function(user, form) {

    // Check if form is vaild first
    if (form.$valid) {

      // Sign in the user with the credentials on success,
      // broadcast it, then set the current user and go to
      // the admins page
      AuthService.logIn(user).then(function(token) {
        $scope.setCurrentUser(user);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: user.email + " successfully signed in."
        });
        $state.go('users');
      }, function(res) {
        ServerErrors.inlineErrors(res, form);
      });
    }
  };
})

// Factory that handles authentication
.factory('AuthService', function($http, $rootScope, $window, Restangular) {
  var authService = {};

  // Method that sends the HTTP request
  authService.logIn = function(credentials) {
    // Get the token
    return Restangular.all('/auth/login').post(credentials).then(function(res) {
      $window.localStorage.token = res.token;
      return res.token;
    }, function(res) {
      throw {
        data: res.data,
        status: res.status
      };
    });
  };

  return authService;
});
