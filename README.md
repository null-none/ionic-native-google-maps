# ionicNativeGoogleMaps
Directive for render native google maps for ionic

[![Bower version](https://badge.fury.io/bo/ionic-native-google-maps.svg)](https://github.com/null-none/ionic-native-google-maps)

## Install

```bash
cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"
bower install ionic-native-google-maps
```

## Example

```html
...
  <script src="lib/ionic-native-google-maps/ionicNativeGoogleMaps.js"></script>
...

```


```js
$scope.lat = 43.2312;
$scope.lng = 12.2344;
$scope.markers = [
  {
    title: 'Test',
    id: 1,
    latitude: 43.2312,
    longitude: 12.2344,
    visible: true,
    icon: 'img/test.png'
  }
]
$scope.map = {
  center: {
    latitude: 43.2312,
    longitude: 12.2344,
  },
  zoom: 16,
};
```

```html
<div native-google-map
     data-latitude="{{map.center.latitude}}"
     data-longitude="{{map.center.longitude}}"
     data-zoom="{{map.zoom}}"
     height="100%">
  <div native-google-map-marker ng-repeat="marker in markers"
                                data-latitude="{{marker.latitude}}"
                                data-id="{{marker.id}}"
                                data-longitude="{{marker.longitude}}"
                                data-icon="{{marker.icon}}"
                                data-visible="{{marker.visible}}"
                                data-title="{{marker.title}}">
  </div>
</div>
```

## License
MIT

## Donation Button

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YYZQ6ZRZ3EW5C)
