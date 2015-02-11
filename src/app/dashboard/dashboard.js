angular.module('SmartMetals.dashboard', [
	'ui.router',
	'restangular'
]).controller('DashboardCtrl', function DashboardCtrl($scope, $rootScope, Restangular, ServerErrors) {
	// Intitalize default models
	var defaultLoad = {
		token: $rootScope.token
	};
	var defaultUnit = {
		token: $rootScope.token
	};
	var dashboardCtrl = this;
	dashboardCtrl.load = angular.copy(defaultLoad);
	dashboardCtrl.unit = angular.copy(defaultUnit);

	// Get the list of loads under account
	accountsCtrl.loads = Restangular.all('accounts').getList({
		token: $rootScope.token
	}).$object;
});
