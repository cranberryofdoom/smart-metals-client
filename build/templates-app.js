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
    "			<i class=\"fa fa-times pull-right\" ng-click=\"accountsCtrl.deleteAccount(account.name, account.id, $index)\"></i>\n" +
    "			{{account.name}}\n" +
    "			<ul>\n" +
    "				<li ng-repeat=\"load in account.loads\">\n" +
    "					{{load.date}}\n" +
    "				</li>\n" +
    "			</ul>\n" +
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
    "  <div class=\"row\">\n" +
    "    <div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12\">\n" +
    "      <div class=\"card card-btn\" ng-click=\"dashboardCtrl.createLoad()\">\n" +
    "        <div class=\"card-content\">\n" +
    "          <h2>New Load</h2>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 col-sm-6 col-xs-12\" ng-repeat=\"load in dashboardCtrl.loads\" ng-class=\"{ 'col-lg-9': load.open, 'col-lg-3': !load.open }\">\n" +
    "      <div class=\"card\">\n" +
    "        <i class=\"fa fa-times\" ng-click=\"dashboardCtrl.deleteLoad(load.date, load.id, $index)\"></i>\n" +
    "        <div class=\"card-content\" ng-class=\"{ 'open': load.open}\">\n" +
    "          <h2 ng-click=\"load.open = !load.open\">{{load.date}}'s Load</h2>\n" +
    "          <div class=\"card-flip\" ng-show=\"load.open\">\n" +
    "            <form ng-show=\"load.create\" role=\"form\" name=\"CreateUnitForm\" ng-submit=\"dashboardCtrl.createUnit(dashboardCtrl.load.unit, $index, CreateUnitForm)\" novalidate>\n" +
    "              <!-- Tag Number -->\n" +
    "              <div class=\"form-group has-feedback\" showError>\n" +
    "                <label for=\"tag_number\">Tag Number</label>\n" +
    "                <input ng-model=\"dashboardCtrl.load.unit.tag_number\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"tag_number\" type=\"number\" class=\"form-control\" placeholder=\"Tag Number\" required>\n" +
    "                <icons></icons>\n" +
    "                <!-- Errors -->\n" +
    "                <errors>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.tag_number.$error.required\">Tag Number required.</p>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.tag_number.$error.serverMessages\" ng-repeat=\"message in CreateUnitForm.tag_number.$error.serverMessages\">{{message}}</p>\n" +
    "                </errors>\n" +
    "              </div>\n" +
    "              <!-- Product -->\n" +
    "              <div class=\"form-group has-feedback\" showError>\n" +
    "                <label for=\"product\">Product</label>\n" +
    "                <input ng-model=\"dashboardCtrl.load.unit.product\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"product\" type=\"text\" class=\"form-control\" placeholder=\"Product\" required>\n" +
    "                <icons></icons>\n" +
    "                <!-- Errors -->\n" +
    "                <errors>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.product.$error.required\">Tag Number required.</p>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.product.$error.serverMessages\" ng-repeat=\"message in CreateUnitForm.product.$error.serverMessages\">{{message}}</p>\n" +
    "                </errors>\n" +
    "              </div>\n" +
    "              <!-- Gross Weight -->\n" +
    "              <div class=\"form-group has-feedback\" showError>\n" +
    "                <label for=\"gross_weight\">Gross Weight</label>\n" +
    "                <input ng-model=\"dashboardCtrl.load.unit.gross_weight\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"gross_weight\" type=\"number\" class=\"form-control\" placeholder=\"Gross Weight\" required>\n" +
    "                <icons></icons>\n" +
    "                <!-- Errors -->\n" +
    "                <errors>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.gross_weight.$error.required\">Gross Weight required.</p>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.gross_weight.$error.serverMessages\" ng-repeat=\"message in CreateUnitForm.gross_weight.$error.serverMessages\">{{message}}</p>\n" +
    "                </errors>\n" +
    "              </div>\n" +
    "              <!-- Tare -->\n" +
    "              <div class=\"form-group has-feedback\" showError>\n" +
    "                <label for=\"product\">Tare</label>\n" +
    "                <input ng-model=\"dashboardCtrl.load.unit.tare\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"tare\" type=\"number\" class=\"form-control\" placeholder=\"Tare\" required>\n" +
    "                <icons></icons>\n" +
    "                <!-- Errors -->\n" +
    "                <errors>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.tare.$error.required\">Tare required.</p>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.tare.$error.serverMessages\" ng-repeat=\"message in CreateUnitForm.tare.$error.serverMessages\">{{message}}</p>\n" +
    "                </errors>\n" +
    "              </div>\n" +
    "              <!-- Comments -->\n" +
    "              <div class=\"form-group has-feedback\" showError>\n" +
    "                <label for=\"comments\">Comments</label>\n" +
    "                <input ng-model=\"dashboardCtrl.load.unit.comments\" ng-model-options=\"{ updateOn: 'blur' }\" name=\"comments\" type=\"text\" class=\"form-control\" placeholder=\"Comments\">\n" +
    "                <icons></icons>\n" +
    "                <!-- Errors -->\n" +
    "                <errors>\n" +
    "                  <p class=\"text-danger\" ng-show=\"CreateUnitForm.comments.$error.serverMessages\" ng-repeat=\"message in CreateUnitForm.comments.$error.serverMessages\">{{message}}</p>\n" +
    "                </errors>\n" +
    "              </div>\n" +
    "              <!-- Submit Button -->\n" +
    "              <button type=\"submit\" class=\"pull-left btn btn-default\">Submit</button>\n" +
    "              <!-- Cancel Button -->\n" +
    "              <button type=\"button\" class=\"pull-right btn btn-default\" ng-click=\"dashboardCtrl.resetForm(CreateUnitForm, $index)\">Cancel</button>\n" +
    "            </form>\n" +
    "            <p ng-show=\"!load.create && load.units.length == 0\"><strong>This load doesn't have any units! Why don't you make one?</strong>\n" +
    "            </p>\n" +
    "            <button ng-show=\"!load.create\" class=\"btn btn-default\" ng-click=\"load.create = !load.create\">Create Unit</button>\n" +
    "            <table ng-show=\"!load.create && load.units.length > 0\" class=\"table table-striped\">\n" +
    "              <thead>\n" +
    "                <tr>\n" +
    "                  <td><strong>Unit Tag Number</strong>\n" +
    "                  </td>\n" +
    "                  <td><strong>Product</strong>\n" +
    "                  </td>\n" +
    "                  <td><strong>Gross Weight</strong>\n" +
    "                  </td>\n" +
    "                  <td><strong>Tare</strong>\n" +
    "                  </td>\n" +
    "                  <td><strong>Comments</strong>\n" +
    "                  </td>\n" +
    "                  <td><strong>Actions</strong>\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "              </thead>\n" +
    "              <tbody>\n" +
    "                <tr ng-repeat=\"unit in load.units\" ng-show=\"load.open\">\n" +
    "                  <td>{{unit.tag_number}}</td>\n" +
    "                  <td>{{unit.product}}</td>\n" +
    "                  <td>{{unit.gross_weight}}</td>\n" +
    "                  <td>{{unit.tare}}</td>\n" +
    "                  <td>{{unit.comments}}</td>\n" +
    "                  <td>\n" +
    "                    <i class=\"fa fa-edit\" ng-click=\"dashboardCtrl.editUnit(unit.tag_number, unit.id, $parent.$index, $index)\"></i>\n" +
    "                    <i class=\"fa fa-times\" ng-click=\"dashboardCtrl.deleteUnit(unit.tag_number, unit.id, $parent.$index, $index)\"></i>\n" +
    "                  </td>\n" +
    "                </tr>\n" +
    "              </tbody>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
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
    "<nav class=\"container\" ng-show=\"show\">\n" +
    "  <ul class=\"nav nav-pills\">\n" +
    "    <li class=\"pull-left\">\n" +
    "      <a href=\"#\">\n" +
    "        <img src=\"assets/images/logo.png\">\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li class=\"pull-right\">\n" +
    "      <a ng-click=\"signOut()\">Sign Out</a>\n" +
    "    </li>\n" +
    "    <li class=\"pull-right\">\n" +
    "      <a href=\"#\">{{currentUser.email}}</a>\n" +
    "    </li>\n" +
    "    <li ng-show=\"currentUser.role == 2\" ui-sref-active-eq=\"active\" class=\"pull-right\">\n" +
    "      <a ui-sref=\"accounts\">Accounts</a>\n" +
    "    </li>\n" +
    "    <li ui-sref-active-eq=\"active\" class=\"pull-right\">\n" +
    "      <a ui-sref=\"dashboard\">Dashboard</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</nav>\n" +
    "<nav class=\"container\" ng-hide=\"show\">\n" +
    "  <h1>Sign In</h1>\n" +
    "  <hr>\n" +
    "</nav>\n" +
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
