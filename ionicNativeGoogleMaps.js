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

  function addMarker(map, latitude, longitude, icon, title) {
    if (map) {
      map.addMarker({
        position: {
          lat: latitude,
          lng: longitude
        },
        icon: {
          'url': icon
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

.directive('nativeGoogleMap', ['serviceGoogleMap', function(serviceGoogleMap) {
  return {
    restrict: 'A',
    scope: {
      mapReady: '&onMapReady'
    },
    link: function(scope, element, attrs) {
      var map = null;

      function triggerMapReady(map) {
        scope.mapReady({
          map: map
        });
        serviceGoogleMap.animateCamera(map, scope.$root.lat, scope.$root.lng, scope.$root.map.zoom);
        if (attrs.hasOwnProperty('height')) {
          element.css('height', attrs.height)
        }
        scope.$root.$watchGroup(['lat', 'lng'], function(newValues, oldValues, scope) {
          serviceGoogleMap.animateCamera(map, scope.$root.lat, scope.$root.lng, scope.$root.map.zoom);
        });
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

        map = plugin.google.maps.Map.getMap(element[0], mapParams);
        map.on(plugin.google.maps.event.MAP_READY, triggerMapReady);
      }, false);
    }
  };
}]);
