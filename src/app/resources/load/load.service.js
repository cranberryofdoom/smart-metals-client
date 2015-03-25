angular.module('SmartMetals.load', [
    'restangular',
    'ui.router'
  ])
  .service('Load', function(Restangular, $q, Image) {

    var loads = [];
    var defaultLoad = {
      open: false,
      create: false,
      images: [],
      imageMediumURLs: [],
      edit: false
    };

    function addDefaultLoadProperties(load) {
      for (var key in defaultLoad) {
        load[key] = defaultLoad[key];
      }
    }

    return {
      getLoads: function(account) {
        return account.getList('loads').then(

          // Sends off the request to get all of the loads for this account.
          function(res) {

            // Initialize the array of promises that this function
            // will be waiting on and keep track of the number of
            // loads that we've gotten.
            var requests = [];
            var numLoads = res.length;

            // Prepare each load for the view.
            loads = res;
            res.forEach(function(value, index) {

              // Push the response into the array of loads and then insert
              // all of the necessary additional data that the view needs
              // to keep track the state.
              addDefaultLoadProperties(loads[index]);

              // Send out a request to get all of the image URLs for this
              // load. Create a promise and push it into the promise array
              // because the request will be done asynchronously.
              var deferred = $q.defer();
              requests.push(deferred.promise);
              Image.getMediumImagesURLs(res[index]).then(

                // If there are images to be rendered add them to the loads. Then
                // indicate that this particular promise has been resolved.
                function(res) {
                  if (res !== undefined) {
                    loads[index].imageMediumURLs = [];
                    for (var i = 0; i < res.length; i++) {
                      loads[index].imageMediumURLs.push(res[i]);
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

            // Make sure you are waiting on the correct number of promises.
            if (requests.length == numLoads) {

              // Wait for all of the promises to finish.
              return $q.all(requests).then(

                // Returns the loads array upon successful completion.
                function(res) {
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
      },
      deleteLoad: function(load) {
        return load.remove().then(function(res) {
          return res;
        }, function(error) {
          throw error;
        });
      },
      createLoad: function(loads) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return loads.post({
          date: year + "-" + month + "-" + day
        }).then(function(res) {
          addDefaultLoadProperties(res);
          return res;
        }, function(error) {
          throw error;
        });
      }
    };
  });
