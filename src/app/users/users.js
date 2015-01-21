angular.module('SmartMetals.users', [
  'ui.router',
  'plusOne',
  'restangular'
])

.config(function config($stateProvider) {
  $stateProvider.state('users', {
    url: '/users',
    views: {
      "main": {
        templateUrl: 'users/users.tpl.html'
      }
    },
    data: {
      pageTitle: 'Users'
    }
  });
})

.controller('UsersCtrl', function UsersController($http, $rootScope, Restangular, ServerErrors) {

  // Intitalize default models
  var defaultUser = {};
  var usersCtrl = this;
  usersCtrl.user = angular.copy(defaultUser);
  usersCtrl.open = false;

  // Get the list of users
  usersCtrl.users = Restangular.all('users').getList().$object;

  // Delete a user
  usersCtrl.deleteUser = function(email, userId, index) {
    Restangular.one('users', userId).remove().then(function(res) {
      usersCtrl.users.splice(index, 1);
      $rootScope.$broadcast('ALERT', {
        type: "success",
        message: email + " successfully deleted."
      });
    }, function(res) {
      ServerErrors.generalErrors(res);
    });
  };

  usersCtrl.resetForm = function(form) {
    usersCtrl.user = angular.copy(usersCtrl.defaultUser);
    usersCtrl.open = false;
    form.$setPristine();
    form.$setUntouched();
  };

  // Create a new user
  usersCtrl.createUser = function(user, form) {

    // Check if form is valid first
    if (form.$valid) {
      Restangular.all('users').post(user).then(function(res) {
        usersCtrl.users.push(res);
        usersCtrl.resetForm(form);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: res.email + " successfully created."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, form);
      });
    }
  };
});
