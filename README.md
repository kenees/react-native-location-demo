## 原生app定位问题

### 1. ios定位 （expo-location）


### 2. android定位 （@uiw/react-native-amap-geolocation@^2.0.0-alpha.3）
1. 因为 android兼容问题， expo-location 无法获取到定位信息
2. 所以更新为第三方高德定位来解决 安卓机型无法获取定位信息的问题
3. @uiw/react-native-amap-geolocation@^2.0.0-alpha.3 库本身是同时支持ios和安卓的



### 3. TOOD
1. 将ios定位也切换成高德库
2. 将地图显示方案从原本的webview切换成高德sdk (webview本身限制比较大) 
    【2.1】 集成react-native-amap3d@^3.2.4
    【2.2】 注意如果使用了amap-geolocation 需要将 react-native-amap-geolocaton/android/build.gradle中的
    ```implementation 'com.amap.api:location:6.2.0'``` 更改为
    ```implementation 'com.amap.api:3dmap:9.6.0'```