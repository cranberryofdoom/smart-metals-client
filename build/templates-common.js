angular.module('templates-common', ['formValidation/icons.tpl.html']);

angular.module("formValidation/icons.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("formValidation/icons.tpl.html",
    "<i class=\"fa fa-check form-control-feedback\" aria-hidden=\"true\"></i>\n" +
    "<i class=\"fa fa-times form-control-feedback\" aria-hidden=\"true\"></i>\n" +
    "");
}]);
