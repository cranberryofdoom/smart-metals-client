angular.module('formDataObject', [])

// Transforms JSON to multipart/form-data
.factory('FormDataObject', function() {
  return function(data) {
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
      fd.append(key, value);
    });
    return fd;
  };
});
