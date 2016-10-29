# ionicNativeGoogleMaps
Directive for render native google maps for ionic

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
$rootScope.lat = 43.2312;
$rootScope.lng = 12.2344;
$rootScope.markers = [
  {
    title: 'Test',
    latitude: 43.2312,
    longitude: 12.2344,
    icon: 'images/icon.png'
  }
]
$rootScope.map = {
  center: {
    latitude: 43.2312,
    longitude: 12.2344,
  },
  zoom: 16,
};
```

```html
<div native-google-map height="100%">
  <div native-google-map-marker ng-repeat="marker in markers"
                                data-latitude="{{marker.latitude}}"
                                data-longitude="{{marker.longitude}}"
                                data-icon="{{marker.icon}}"
                                data-title="{{marker.title}}">
  </div>
</div>
```

## License
MIT
