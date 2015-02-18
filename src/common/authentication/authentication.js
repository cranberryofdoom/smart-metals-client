angular.module('authentication', [
    'restangular',
    'ui.router'
  ])
  .service('Authentication', function(Restangular, $rootScope, $state, $window) {
    function getCurrentUser(token) {
      Restangular.one('users').customGET('current', {
        token: token
      }).then(function(res) {
        // The server is able to find a current user with the
        // saved token. Save the retrieved current user and
        // make it accessible to all of the controllers.
        $rootScope.currentUser = {
          email: res.email,
          id: res.id,
          firstname: res.firstname,
          lastname: res.lastname,
          role: res.role,
          account_id: res.account_id
        };
        $rootScope.$broadcast('currentUserRetrieved', $rootScope.currentUser);
        $rootScope.show = true;
        $state.go('dashboard');
        return $rootScope.currentUser;
      }, function(res) {
        // The server was not able to find the current user with
        // the token. Which means the token is either expired or just
        // bad. Delete the token.
        delete $window.localStorage.token;
        $rootScope.show = false;
        $state.go('logIn');
        return false;
      });
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }
    return {
      getCurrentUser: function(token) {
        if (!$rootScope.currentUser) {
          getCurrentUser(token);
        }
        return $rootScope.currentUser;
      },
      setCurrentUser: function(user) {
        setCurrentUser(user);
      },
      logInUser: function(user) {
        return Restangular.all('/auth/login').post(user).then(function(res) {
          $window.localStorage.token = res.token;
          setCurrentUser(user);
          return getCurrentUser(res.token);
        }, function(res) {
          throw {
            data: res.data,
            status: res.status
          };
        });
      }
    };
  });
