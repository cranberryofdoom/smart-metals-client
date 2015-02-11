angular.module('SmartMetals.router', [
  'ui.router'
]).config(['$stateProvider', function config($stateProvider) {
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
    }).state('users', {
      url: '/users',
      views: {
        "main": {
          templateUrl: 'users/users.tpl.html'
        }
      },
      data: {
        pageTitle: 'Users'
      }
    })
    .state('accounts', {
      url: '/accounts',
      views: {
        "main": {
          templateUrl: 'accounts/accounts.tpl.html'
        }
      },
      data: {
        pageTitle: 'Accounts'
      }
    });
}]);
