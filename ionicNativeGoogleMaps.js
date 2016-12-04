angular.module('ionicNativeGoogleMaps', [])


.factory('serviceGoogleMap', function($rootScope) {


  function animateCamera(map, lat, lng, zoom) {
    if (map) {
      map.animateCamera({
        target: new plugin.google.maps.LatLng(lat, lng),
        zoom: zoom,
        duration: 5000
      }, function() {});
    }
  }

  function moveCamera(map, lat, lng, zoom) {
    if (map) {
      map.moveCamera({
        target: new plugin.google.maps.LatLng(lat, lng),
        zoom: zoom,
        duration: 5000
      }, function() {});
    }
  }

  function addMarker(map, latitude, longitude, icon, title, id) {
    if (map) {
      map.addMarker({
        position: {
          lat: latitude,
          lng: longitude
        },
        icon: {
          url: icon
        },
        title: title,
        myMsg: id,
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
      });
    }
  }

  return {
    moveCamera: moveCamera,
    addMarker: addMarker,
    animateCamera: animateCamera
  }
})

.directive('nativeGoogleMap', ['serviceGoogleMap', '$window', function(serviceGoogleMap, $window) {
  return {
    restrict: 'A',
    scope: {
      mapReady: '&onMapReady'
    },
    link: function(scope, element, attrs) {
      $window.map = null;

      function triggerMapReady(map) {
        scope.mapReady({
          map: map
        });
        serviceGoogleMap.moveCamera(map, attrs.latitude, attrs.longitude, attrs.zoom);
        if (attrs.hasOwnProperty('height')) {
          element.css('height', attrs.height)
        }
        serviceGoogleMap.moveCamera(map, attrs.latitude, attrs.longitude, attrs.zoom);
      }

      document.addEventListener("deviceready", function() {
        var mapParams = {
          'mapType': plugin.google.maps.MapTypeId.ROADMAP,
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          }
        };

        $window.map = plugin.google.maps.Map.getMap(element[0], mapParams);
        $window.map.on(plugin.google.maps.event.MAP_READY, triggerMapReady);
      }, false);
    }
  };
}])

.directive('nativeGoogleMapMarker', ['serviceGoogleMap', '$window', function(serviceGoogleMap, $window) {
  return {
    restrict: 'A',
    scope: {
      mapReady: '&onMapReady'
    },
    link: function(scope, element, attrs) {
      document.addEventListener("deviceready", function() {
        serviceGoogleMap.addMarker($window.map, attrs.latitude, attrs.longitude, attrs.icon, attrs.title, attrs.id);
      }, false);
    }
  };
}]);
