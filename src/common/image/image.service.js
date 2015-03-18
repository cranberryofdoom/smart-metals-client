angular.module('SmartMetals.image', [
    'restangular',
    'ui.router'
  ])
  .service('Image', function(Restangular, $rootScope, $state) {

    var imageURLs = [];
    var mediumImageURLs = [];
    var thumbnailImageURLs = [];

    function getImage(load, image) {
      return load.one('images', image).get().then(function(res) {
        return res;
      }, function(error) {
        throw error;
      });
    }

    function getImages(load) {
      return load.getList('images').then(function(res) {
        return res;
      }, function(error) {
        throw error;
      });
    }

    return {
      getImagesURL: function(load) {
        return getImages(load).then(function(res) {
          imageURLs.length = 0;
          if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
              imageURLs.push(res[i].original_url);
            }
          }
          return imageURLs;
        }, function(error) {
          throw error;
        });
      },

      getMediumImageURLs: function(load) {
        return getImages(load).then(function(res) {
          if (res.length > 0) {
            console.log(res.length);
            for (var i = 0; i < res.length; i++) {
              imageURLs.push(res[i].original_url);
            }
          }

          return imageURLs;
        }, function(error) {
          throw error;
        });
      },

      getImageURL: function(user) {
        return true;
      },
      getMediumImageURL: function() {
        return true;
      },
      getThumbnailImageURL: function() {
        return true;
      }
    };
  });
