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

  // Logs in the user and handles page naviation
  // and any local scope setting from there
  logInCtrl.logIn = function(user, form) {

    // Check if form is vaild first
    if (form.$valid) {

      // Log in the user
      Authentication.logInUser(user).then(

        // Log in was successful. Alert the user that it was,
        // change the navbar so that it displays the proper
        // user information, notify the other modules
        // that the current user is loaded into the $rootScope
        // and switch over to the dashboard state.
        function(res) {
          $rootScope.$broadcast('currentUserRetrieved', $rootScope.currentUser);
          $state.go('dashboard');
          $rootScope.show = true;
          $rootScope.$broadcast('ALERT', {
            type: "success",
            message: res.email + " successfully signed in."
          });
        },

        // Log in was unsuccessful. Display the errors.
        function(error) {
          ServerErrors.inlineErrors(error, form);
        });
    }
  };
});
