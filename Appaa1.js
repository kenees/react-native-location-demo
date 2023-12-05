import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
// import { init, Geolocation } from 'react-native-amap-geolocation'


export default function App() {
  const [text, setText] = useState('')
  useEffect(() => {
    const initMap = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])

      await init({
        android: '7e066f365be27b1aee36551c29de5502',
      })

      Geolocation.getCurrentPosition(loc => {
        console.log(loc)
        setText("aaa")
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
      <StatusBar style="auto" />
      {/* <MapView /> */}
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
