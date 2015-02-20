angular.module('authentication', [
    'restangular',
    'ui.router'
  ])
  .service('Authentication', function(Restangular, $rootScope, $state, $window) {

    // Sends off the actual HTTP request to get
    // a current user with a given token and returns
    // a promise
    function getCurrentUser(token) {
      return Restangular.one('users').customGET('current', {
        token: token
      }).then(

        // The server is able to find a current user with the
        // saved token. Set the current user and return the result.
        function(res) {
          setCurrentUser(res);
          return res;
        },
        function(error) {
          throw error;
        });
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function setToken(token) {
      $rootScope.token = token;
      Restangular.setDefaultRequestParams({
        token: token
      });
    }

    return {
      getCurrentUser: function(token) {
        return getCurrentUser(token);
      },

      setCurrentUser: function(user) {
        setCurrentUser(user);
      },

      // Sends off the actual HTTP request to log the
      // user in and returns a promise
      logInUser: function(user) {
        return Restangular.all('/auth/login').post(user).then(

          // The log in is successful. Save the token, set
          // Restangular to start sending all requests with
          // the token and use it to get the user information
          function(res) {
            $window.localStorage.token = res.token;
            setToken(res.token);
            return getCurrentUser(res.token).then(function(res) {
              return res;
            }, function(error) {
              throw error;
            });
          },

          // The log in is unsuccessful. Return the error.
          function(error) {
            throw error;
          });
      },

      // Sends off the actual HTTP request to log the user
      // user out, deletes the token and returns a promise
      logOutUser: function() {
        return Restangular.all('/auth/logout').remove({
          token: $window.localStorage.token
        }).then(

          // The log out is successful. Delete the token from
          // both local storage and the $rootScope and navigate
          // to the log in page.
          function(res) {
            delete $window.localStorage.token;
            $rootScope.show = false;
            $state.go('logIn');
          },

          // The log out is unsuccessful. Return the error.
          function(error) {
            throw error;
          });
      }
    };
  });
