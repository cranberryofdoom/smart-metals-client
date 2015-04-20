angular.module('formDataObject', [])

// Transforms JSON to multipart/form-data
.factory('FormDataObject', function() {
  return function(data) {
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
      if (key == "images[]") {
        for (var i = 0; i < value.length; i++) {
          fd.append("images[]", value[i]);
        }
      } else {
        fd.append(key, value);
      }
    });
    return fd;
  };
});
