angular.module('SmartMetals.unit', [
    'restangular',
    'ui.router'
  ])
  .service('Unit', function(Restangular, $rootScope, $state) {
    return {
      getUnits: function(load) {
        return load.getList('units').then(function(res) {
          return res;
        }, function(error) {
          throw error;
        });
      },
      createUnit: function(unit, load) {
        return load.post("units", unit).then(function(res) {
          return res;
        }, function(error) {
          throw error;
        });
      }
    };
  });
