angular.module('ionicNativeGoogleMaps', [])


.factory('serviceGoogleMap', function() {

  function animateCamera(map, lat, lng, zoom) {
    if (map) {
      if (parseFloat(lat) && parseFloat(lng)) {
        map.animateCamera({
          target: {
            lat: lat,
            lng: lng
          },
          zoom: zoom,
          duration: 5000
        }, function() {});
      }
    }
  }

  function addMarker(map, latitude, longitude, title) {
    if (map) {
      map.addMarker({
        position: {
          lat: latitude,
          lng: longitude
        },
        title: title,
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
        marker.showInfoWindow();
      });
    }
  }
  return {
    animateCamera: animateCamera,
    addMarker: addMarker
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
      $window.markers = [];

      function triggerMapReady(map) {
        scope.mapReady({
          map: map
        });
        serviceGoogleMap.animateCamera(map, scope.$root.lat, scope.$root.lng, scope.$root.map.zoom);
        if (attrs.hasOwnProperty('height')) {
          element.css('height', attrs.height)
        }
        serviceGoogleMap.animateCamera(map, scope.$root.map.center.latitude, scope.$root.map.center.longitude, scope.$root.map.zoom);
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
        serviceGoogleMap.addMarker($window.map, attrs.latitude, attrs.longitude, attrs.title);
      }, false);
    }
  };
}]);
