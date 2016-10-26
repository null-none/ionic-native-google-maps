angular.module('ionicNativeGoogleMaps', [])

.directive('nativeGoogleMap', function() {
  return {
    restrict: 'A',
    scope: {
      mapReady: '&onMapReady'
    },
    link: function(scope, element, attrs) {
      var map = null;
      scope.$root.$watchGroup(['lat', 'lng'], function(newValues, oldValues, scope) {
        if (map) {
          map.animateCamera({
            target: {
              lat: scope.$root.lat,
              lng: scope.$root.lng
            },
            zoom: scope.$root.map.zoom,
            tilt: 60,
            bearing: 140,
            duration: 5000
          }, function() {});
        }
      });

      function marker(map, item) {
        map.addMarker({
          position: {
            lat: item.latitude,
            lng: item.longitude
          },
          icon: {
            'url': item.icon
          },
          title: item.title,
          snippet: item.latitude + ' , ' + item.longitude,
          animation: plugin.google.maps.Animation.BOUNCE
        }, function(marker) {
          marker.showInfoWindow();
        });
      }

      function triggerMapReady(map) {
        scope.mapReady({
          map: map
        });

        map.animateCamera({
          target: {
            lat: scope.$root.map.center.latitude,
            lng: scope.$root.map.center.longitude
          },
          zoom: scope.$root.map.zoom,
          tilt: 60,
          bearing: 140,
          duration: 5000
        }, function() {});

        if (attrs.hasOwnProperty('height')) {
          element.css('height', attrs.height)
        }
        scope.$root.markers.forEach(function(item, i, arr) {
          marker(map, item);
        });
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
});
