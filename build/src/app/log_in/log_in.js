angular.module('SmartMetals.logIn', [
  'ui.router',
  'restangular',
  'formValidation',
  'authentication'
])

.controller('LogInCtrl', function LogInController($scope, $rootScope, $state, Restangular, ServerErrors, Authentication) {
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
      Authentication.logInUser(user).then(function(token) {
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: user.email + " successfully signed in."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, form);
      });
    }
  };
});
