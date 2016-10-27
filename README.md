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
$rootScope.map = {
  center: {
    latitude: 43.2312,
    longitude: 12.2344,
  },
  zoom: 16,
};
```

```html
<div native-google-map height="400px" ></div>
```

## License
MIT
