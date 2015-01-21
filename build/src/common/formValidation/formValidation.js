angular.module('formValidation', ['templates-common'])

.directive('icons', function() {
  return {
    require: '^form',
    restrict: 'E',
    templateUrl: 'formValidation/icons.tpl.html'
  };
})

.directive('errors', function() {
  return {
    require: '^form',
    restrict: 'E',
    link: function($scope, el, attrs, formCtrl) {
      var inputEl = el.parent()[0].querySelector('[name]');
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');

      $scope.$watchGroup([
        formCtrl.$name + "." + inputName + ".$invalid",
        formCtrl.$name + "." + inputName + ".$touched",
        formCtrl.$name + ".$submitted"
      ], function(newValues, oldValues, $scope) {
        var invalid = newValues[0];
        var touched = newValues[1];
        var submitted = newValues[2];
        var errors = submitted && invalid || touched && invalid;
        el.toggleClass('hide', !errors);
      });
    }
  };
})

.factory('ServerErrors', function($rootScope) {
  var serverErrors = {};

  serverErrors.generalErrors = function(res) {
    switch (res.status) {
      case 422:
        angular.forEach(res.data, function(value, key) {
          for (var i = 0; i < value.length; i++) {
            showAlertError(value[i]);
          }
        });
        break;
      case 500:
        showAlertError(res.data.error);
        break;
    }
  };

  serverErrors.inlineErrors = function(res, form) {
    switch (res.status) {
      case 422:
        angular.forEach(res.data, function(value, key) {
          form[key].$setValidity(key, false);
          form[key].$error.serverMessages = value;
        });
        break;
      case 500:
        showAlertError(res.data.error);
        break;
    }
  };

  var showAlertError = function(message) {
    $rootScope.$broadcast('ALERT', {
      type: "danger",
      message: message
    });
  };
  return serverErrors;
});
