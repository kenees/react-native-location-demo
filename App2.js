import React, { useEffect, useState } from 'react';
import { Linking, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location'
import { init, Geolocation } from 'react-native-amap-geolocation'

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
    //   Location.watchPositionAsync({
    //     accuracy: 6,
    //     distanceInterval: 0,
    //     timeInterval: 3000,
    //     // android
    //     mayShowUserSettingsDialog: true,
    // }, p => {
    //     console.log(Platform.OS, p)
    //     setText(JSON.stringify(p))
    // })

  }, [])

  useEffect(() => {

    const initMap = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])

      await init({
        android: '7e066f365be27b1aee36551c29de5502',
      }) // 高德api key

      Geolocation.getCurrentPosition(loc => {
        console.log('android: ', loc)
        setText(JSON.stringify(loc))
      })
      //       Geolocation.watchPosition(p = {
      //        console.log('watch: ', p)
      //       })
    }

    initMap()
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
