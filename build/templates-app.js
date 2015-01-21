angular.module('templates-app', ['alerts/alerts.tpl.html', 'log_in/log_in.tpl.html', 'navbar/navbar.tpl.html', 'users/users.tpl.html']);

angular.module("alerts/alerts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alerts/alerts.tpl.html",
    "<alert ng-repeat=\"alert in alerts\" type=\"alert.type\"close=\"closeAlert($index)\">\n" +
    "	{{alert.message}}\n" +
    "</alert>\n" +
    "");
}]);

angular.module("log_in/log_in.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("log_in/log_in.tpl.html",
    "<form role=\"form\" name=\"LogInForm\" ng-controller=\"LogInCtrl as LogInCtrl\" ng-submit=\"LogInCtrl.logIn(LogInCtrl.user, LogInForm)\" novalidate submit-errors>\n" +
    "	<!-- Email -->\n" +
    "	<div class=\"form-group has-feedback\" inline-errors>\n" +
    "		<label for=\"email\">Email</label>\n" +
    "		<input ng-model=\"LogInCtrl.user.email\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\" required>\n" +
    "		<icons></icons>\n" +
    "		<!-- Errors -->\n" +
    "		<errors>\n" +
    "			<p class=\"text-danger\" ng-show=\"LogInForm.email.$error.required\">Email required.</p>\n" +
    "			<p class=\"text-danger\">Invaild email.</p>\n" +
    "			<p class=\"text-danger\" ng-show=\"LogInForm.email.$error.serverMessages\" ng-repeat=\"message in LogInForm.email.$error.serverMessages\">{{message}}</p>\n" +
    "		</errors>\n" +
    "	</div>\n" +
    "	<!-- Password -->\n" +
    "	<div class=\"form-group has-feedback\" inline-errors>\n" +
    "		<label for=\"password\">Password</label>\n" +
    "		<input ng-model=\"LogInCtrl.user.password\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" required>\n" +
    "		<icons></icons>\n" +
    "		<!-- Errors -->\n" +
    "		<errors>\n" +
    "			<p class=\"text-danger\" ng-show=\"LogInForm.password.$error.required\">Password required.</p>\n" +
    "			<p class=\"text-danger\">Invaild password.</p>\n" +
    "		</errors>\n" +
    "	</div>\n" +
    "	<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "</form>\n" +
    "");
}]);

angular.module("navbar/navbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navbar/navbar.tpl.html",
    "<div ng-show=\"AppCtrl.show\">\n" +
    "  <ul class=\"nav nav-pills\">\n" +
    "    <li class=\"pull-left\">\n" +
    "      <a href=\"#\">{{AppCtrl.currentUser.email}}</a>\n" +
    "    </li>\n" +
    "    <li class=\"pull-right\">\n" +
    "      <a ng-click=\"AppCtrl.signOut()\">Sign Out</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <ul class=\"nav nav-tabs\">\n" +
    "    <li>\n" +
    "      <a>Dashboard</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a ui-sref=\"users\">Users</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a href=\"/#/orders\">Orders</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a ui-sref=\"items\">Items</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div ng-hide=\"AppCtrl.show\">\n" +
    "  <h1>Sign In</h1>\n" +
    "  <hr>\n" +
    "</div>\n" +
    "");
}]);

angular.module("users/users.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("users/users.tpl.html",
    "<div class=\"content\" ng-controller=\"UsersCtrl as usersCtrl\">\n" +
    "  <accordion>\n" +
    "    <accordion-group heading=\"Create User\" is-open=\"usersCtrl.open\">\n" +
    "      <form role=\"form\" name=\"CreateUserForm\" ng-submit=\"usersCtrl.createUser(usersCtrl.user, CreateUserForm)\" novalidate>\n" +
    "        <!-- Email -->\n" +
    "        <div class=\"form-group has-feedback\" showError>\n" +
    "          <label for=\"email\">Email</label>\n" +
    "          <input ng-model=\"usersCtrl.user.email\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\" required>\n" +
    "          <icons></icons>\n" +
    "          <!-- Errors -->\n" +
    "          <errors>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.email.$error.required\">Email required.</p>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.email.$invalid\">Invaild email.</p>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.email.$error.serverMessages\" ng-repeat=\"message in CreateUserForm.email.$error.serverMessages\">{{message}}</p>\n" +
    "          </errors>\n" +
    "        </div>\n" +
    "        <!-- Password -->\n" +
    "        <div class=\"form-group has-feedback\" showError>\n" +
    "          <label for=\"password\">Password</label>\n" +
    "          <input ng-model=\"usersCtrl.user.password\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" required>\n" +
    "          <icons></icons>\n" +
    "          <!-- Errors -->\n" +
    "          <errors>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.password.$error.required\">\n" +
    "              Password required.</p>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.password.$error.serverMessages\" ng-repeat=\"message in CreateUserForm.password.$error.serverMessages\">{{message}}</p>\n" +
    "          </errors>\n" +
    "        </div>\n" +
    "        <!-- Confirm Password -->\n" +
    "        <div class=\"form-group has-feedback\" showError>\n" +
    "          <label for=\"password\">Confirm password</label>\n" +
    "          <input ng-model=\"usersCtrl.user.confirmPassword\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"confirmPassword\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\" required>\n" +
    "          <icons></icons>\n" +
    "          <!-- Errors -->\n" +
    "          <errors>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.confirmPassword.$error.required\">\n" +
    "              Confirm Password required.</p>\n" +
    "            <p class=\"text-danger\" ng-show=\"user.password !== user.confirmPassword\">Passwords must match.</p>\n" +
    "            <p class=\"text-danger\" ng-show=\"CreateUserForm.confirmPassword.$error.serverMessages\" ng-repeat=\"message in CreateUserForm.confirmPassword.$error.serverMessages\">{{message}}</p>\n" +
    "          </errors>\n" +
    "        </div>\n" +
    "        <!-- Submit Button -->\n" +
    "        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "        <!-- Cancel Button -->\n" +
    "        <button type=\"button\" class=\"pull-right btn btn-default\" ng-click=\"usersCtrl.resetForm(CreateUserForm)\">Cancel</button>\n" +
    "      </form>\n" +
    "    </accordion-group>\n" +
    "  </accordion>\n" +
    "\n" +
    "  <ul class=\"list-group\">\n" +
    "    <div class=\"list-group-item\">\n" +
    "      <h3 class=\"list-group-item-heading\">Users</h3>\n" +
    "    </div>\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"user in usersCtrl.users\">\n" +
    "      {{user.email}}\n" +
    "      <i class=\"fa fa-times pull-right\" ng-click=\"usersCtrl.deleteUser(user.email, user.id, $index)\"></i>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
