angular.module('ionicCordovaGooglemaps', [])

.directive('googleMap', function() {
  return {
    restrict: 'A',
    scope: {
      mapReady: '&onMapReady'
    },
    link: function(scope, element, attrs) {
      function triggerMapReady(map) {
        scope.mapReady({
          map: map
        });
        if (attrs.hasOwnProperty('height')) {
          element.css('height', attrs.height)
        }
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

        var map = plugin.google.maps.Map.getMap(element[0], mapParams);
        map.on(plugin.google.maps.event.MAP_READY, triggerMapReady);
      }, false);
    }
  };
});
