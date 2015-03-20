angular.module('templates-common', ['backImg/backImg.tpl.html', 'formValidation/icons.tpl.html']);

angular.module("backImg/backImg.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("backImg/backImg.tpl.html",
    "<i class=\"carousel-left fa fa-caret-left fa-lg\" ng-click=\"left(screenshot.photos.length)\"></i>\n" +
    "<i class=\"carousel-right fa fa-caret-right fa-lg\" ng-click=\"right(screenshot.photos.length)\"></i>\n" +
    "");
}]);

angular.module("formValidation/icons.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("formValidation/icons.tpl.html",
    "<i class=\"fa fa-check form-control-feedback\" aria-hidden=\"true\"></i>\n" +
    "<i class=\"fa fa-times form-control-feedback\" aria-hidden=\"true\"></i>\n" +
    "");
}]);
