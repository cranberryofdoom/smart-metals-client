angular.module('SmartMetals.accounts', [
  'ui.router',
  'restangular'
]).controller('AccountsCtrl', function AccountsCtrl($scope, $rootScope, Restangular, ServerErrors) {
  // Intitalize default models
  var defaultAccount = {
    token: $rootScope.token
  };
  var accountsCtrl = this;
  accountsCtrl.account = angular.copy(defaultAccount);
  accountsCtrl.open = false;

  // Get the list of accounts
  var accounts = Restangular.all('accounts');
  accounts.getList({
    token: $rootScope.token
  }).then(function(accounts) {
    accountsCtrl.accounts = accounts;
    // Get the list of all loads under each account
    for (var i = 0; i < accountsCtrl.accounts.length; i++) {
      accountsCtrl.accounts[i].loads = accountsCtrl.accounts[i].getList('loads', {
        token: $rootScope.token
      }).$object;
    }
  });

  accountsCtrl.resetForm = function(form) {
    accountsCtrl.account = angular.copy(accountsCtrl.defaultAccount);
    accountsCtrl.open = false;
    form.$setPristine();
    form.$setUntouched();
  };

  // Create a new account
  accountsCtrl.createAccount = function(account, form) {
    // Check if form is valid first
    if (form.$valid) {
      Restangular.all('accounts').post(account).then(function(res) {
        accountsCtrl.accounts.push(res);
        accountsCtrl.resetForm(form);
        $rootScope.$broadcast('ALERT', {
          type: "success",
          message: res.name + " successfully created."
        });
      }, function(res) {
        ServerErrors.inlineErrors(res, form);
      });
    }
  };
});
