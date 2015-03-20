angular.module('SmartMetals.image', [
    'restangular',
    'ui.router'
  ])
  .service('Image', function(Restangular, $rootScope, $state, FormDataObject) {

    var imageURLs = [];
    var mediumImageURLs = [];
    var thumbnailImageURLs = [];

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

      getMediumImagesURLs: function(load) {
        return getImages(load).then(function(res) {
          imageURLs.length = 0;
          if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
              imageURLs.push(res[i].medium_url);
            }
          }
          return imageURLs;
        }, function(error) {
          throw error;
        });
      },

      getThumbImagesURLs: function() {
        return getImages(load).then(function(res) {
          imageURLs.length = 0;
          if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
              imageURLs.push(res[i].thumb_url);
            }
          }
          return imageURLs;
        }, function(error) {
          throw error;
        });
      },

      createImage: function(load) {
        return load.withHttpConfig({
          transformRequest: FormDataObject
        }).customPOST(load, "images", null, {
          'Content-Type': undefined
        }).then(function(res) {
          return res;
        }, function(error) {
          throw error;
        });
      }
    };
  });
