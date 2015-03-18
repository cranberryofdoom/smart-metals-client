angular.module('SmartMetals.load', [
    'restangular',
    'ui.router'
  ])
  .service('Load', function(Restangular, $q, Image) {

    var loads = [];

    return {
      getLoads: function(account) {

        return account.getList('loads').then(
          // Sends off the request to get all of the loads for this account.
          function(res) {

            // Initialize the array of promises that this function
            // will be waiting on.
            var requests = [];

            // Keep track of the number of loads that we've gotten.
            var numLoads = res.length;

            // Prepare each load for the view.
            res.forEach(function(value, index) {

              // Push the response into the array of loads and then insert
              // all of the necessary additional data that the view needs
              // to keep track the state.
              loads.push(res[index]);
              loads[index].open = false;
              loads[index].create = false;

              // Send out a request to get all of the image URLs for this
              // load. Create a promise and push it into the promise array
              // because the request will be done asynchronously.
              var deferred = $q.defer();
              requests.push(deferred.promise);
              Image.getImagesURL(res[index]).then(

                // If there are images to be rendered add them to the loads. Then
                // indicate that this particular promise has been resolved.
                function(res) {
                  if (res !== undefined) {
                    loads[index].images = [];
                    for (var i = 0; i < res.length; i++) {
                      loads[index].images.push(res[i]);
                    }
                    deferred.resolve(res);
                  } else {
                    deferred.resolve(res);
                  }
                },
                // The image retreival is unsuccessful. Return the error.
                function(error) {
                  throw error;
                });
            });

            if (requests.length == numLoads) {
              console.log(requests.length);
              // Wait for all of the promises to finish.
              return $q.all(requests).then(

                // Returns the loads array upon successful completion.
                function(res) {
                  console.log(loads);
                  return loads;
                },

                // If something went wrong, return the error.
                function(error) {
                  throw error;
                });
            }
          },

          // The load retreival is unsuccessful. Return the error.
          function(error) {
            throw error;
          });

      }
    };
  });
