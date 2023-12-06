import React, { useEffect, useState } from 'react';
import { Linking, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location'
// import AMapGeolocation  from '@uiw/react-native-amap-geolocation'
import { MapView, AMapSdk } from 'react-native-amap3d';
import { Platform } from 'react-native';

export default function App() {
  const [text, setText] = useState('')
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  const [permission, requestPermission] = Location.useForegroundPermissions(); // ios不能后台获取权限


  useEffect(() => {
    //    // 无法直接请求权限， 需要前往设置打开
    if (permission && !permission.canAskAgain && !permission.granted) {
      console.log("pe", permission.granted)
      setV1(true)
    }

    // // 权限过期， 可以再次请求权限
    if (permission && permission.canAskAgain && !permission.granted) {
      console.log("pe1", permission.granted)
      setV2(true)
    }
  }, [])


  useEffect(() => {
    let lister = null
    const initMap = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])

      console.log("AAA", AMapGeolocation.setApiKey)
      AMapGeolocation.setApiKey("7e066f365be27b1aee36551c29de5502")

      AMapGeolocation.start()

      lister = AMapGeolocation.addLocationListener(location => {
        console.log(location)
        setText(JSON.stringify(location))
      })
    }

    // initMap()

    return () => {
      lister?.remove()
    }
  }, [])


  useEffect(() => {
    AMapSdk.init(
      Platform.select({
        android: '7e066f365be27b1aee36551c29de5502',
        ios: "c825fdab9d55336f49668bdc1ed11794"
      })
    )
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to ddstart working on your app!</Text>
      <Text>{text}</Text>
      {v1}
      {v2}

      <Button title='request..' onPress={() => Linking.openSettings()}>
        request...
      </Button>

      <Button title='request..' onPress={requestPermission}>
        request...
      </Button>

      <MapView 
        myLocationEnabled
        onLocation={d => {
          console.log(d)
        }}
        style={{width: '100%', height: '100%'}}
        // coordinate={{
        //   latitude: 39.91,
        //   longitude: 116.37
        // }}
      >
          <Text>aa</Text>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
