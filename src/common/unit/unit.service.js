angular.module('SmartMetals.unit', [
    'restangular',
    'ui.router'
  ])
  .service('Unit', function(Restangular, $rootScope, $state) {
    var units = [];

    return {
      getUnits: function(load) {
        return load.getList('units').then(function(res) {
          units = res;
        }, function(error) {
          throw error;
        });
      }
    };
  });
