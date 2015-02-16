angular.module('templates-app', ['accounts/accounts.tpl.html', 'alerts/alerts.tpl.html', 'dashboard/dashboard.tpl.html', 'log_in/log_in.tpl.html', 'navbar/navbar.tpl.html', 'users/users.tpl.html']);

angular.module("accounts/accounts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("accounts/accounts.tpl.html",
    "<div class=\"content\" ng-controller=\"AccountsCtrl as accountsCtrl\">\n" +
    "	<accordion>\n" +
    "		<accordion-group heading=\"Create Account\" is-open=\"accountsCtrl.open\">\n" +
    "			<form role=\"form\" name=\"CreateAccountForm\" ng-submit=\"accountsCtrl.createAccount(accountsCtrl.account, CreateAccountForm)\" novalidate>\n" +
    "				<!-- Name -->\n" +
    "				<div class=\"form-group has-feedback\" showError>\n" +
    "					<label for=\"name\">Name</label>\n" +
    "					<input ng-model=\"accountsCtrl.account.name\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Name\" required>\n" +
    "					<icons></icons>\n" +
    "					<!-- Errors -->\n" +
    "					<errors>\n" +
    "						<p class=\"text-danger\" ng-show=\"CreateAccountForm.name.$error.required\">Name required.</p>\n" +
    "						<p class=\"text-danger\" ng-show=\"CreateAccountForm.name.$error.serverMessages\" ng-repeat=\"message in CreateAccountForm.name.$error.serverMessages\">{{message}}</p>\n" +
    "					</errors>\n" +
    "				</div>\n" +
    "				<!-- Submit Button -->\n" +
    "				<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "				<!-- Cancel Button -->\n" +
    "				<button type=\"button\" class=\"pull-right btn btn-default\" ng-click=\"accountsCtrl.resetForm(CreateAccountForm)\">Cancel</button>\n" +
    "			</form>\n" +
    "		</accordion-group>\n" +
    "	</accordion>\n" +
    "\n" +
    "	<ul class=\"list-group\">\n" +
    "		<div class=\"list-group-item\">\n" +
    "			<h3 class=\"list-group-item-heading\">Accounts</h3>\n" +
    "		</div>\n" +
    "		<li class=\"list-group-item\" ng-repeat=\"account in accountsCtrl.accounts\">\n" +
    "			{{account.name}}\n" +
    "			<ul>\n" +
    "				<li ng-repeat=\"load in account.loads\">\n" +
    "					{{load.date}}\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<i class=\"fa fa-times pull-right\" ng-click=\"accountsCtrl.deleteAccount(account.name, account.id, $index)\"></i>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("alerts/alerts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alerts/alerts.tpl.html",
    "<alert ng-repeat=\"alert in alerts\" type=\"alert.type\"close=\"closeAlert($index)\">\n" +
    "	{{alert.message}}\n" +
    "</alert>\n" +
    "");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<div class=\"content\" ng-controller=\"DashboardCtrl as dashboardCtrl\">\n" +
    "	<button class=\"btn btn-default\" ng-click=\"dashboardCtrl.createLoad()\">New Load</button>\n" +
    "	<accordion>\n" +
    "		<accordion-group heading=\"{{load.date}}'s Load\" ng-repeat=\"load in dashboardCtrl.loads\">\n" +
    "			<i class=\"fa fa-times pull-right\" ng-click=\"dashboardCtrl.deleteLoad(load.date, load.id, $index)\"></i>\n" +
    "			<button class=\"btn btn-default\">New Unit</button>\n" +
    "			<ul>\n" +
    "				<li ng-repeat=\"unit in load.units\"></li>\n" +
    "			</ul>\n" +
    "		</accordion-group>\n" +
    "	</accordion>\n" +
    "</div>\n" +
    "");
}]);

angular.module("log_in/log_in.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("log_in/log_in.tpl.html",
    "<form role=\"form\" name=\"LogInForm\" ng-controller=\"LogInCtrl as logInCtrl\" ng-submit=\"logInCtrl.logIn(logInCtrl.user, LogInForm)\" novalidate submit-errors>\n" +
    "	<!-- Email -->\n" +
    "	<div class=\"form-group has-feedback\" inline-errors>\n" +
    "		<label for=\"email\">Email</label>\n" +
    "		<input ng-model=\"logInCtrl.user.email\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\" required>\n" +
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
    "		<input ng-model=\"logInCtrl.user.password\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\" required>\n" +
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
    "<div ng-show=\"show\">\n" +
    "  <ul class=\"nav nav-pills\">\n" +
    "    <li class=\"pull-left\">\n" +
    "      <a href=\"#\">{{currentUser.email}}</a>\n" +
    "    </li>\n" +
    "    <li class=\"pull-right\">\n" +
    "      <a ng-click=\"AppCtrl.signOut()\">Sign Out</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <ul class=\"nav nav-tabs\">\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a ui-sref=\"accounts\">Accounts</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a ui-sref=\"users\">Users</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\">\n" +
    "      <a ui-sref=\"dashboard\">Dashboard</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<div ng-hide=\"show\">\n" +
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
