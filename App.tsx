import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React,{useState} from 'react';
export default function App() {
 
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false)
  const[barcode,setBarcode] = useState([])
if(!permission){
  return <View/>
}
if(!permission.granted){
  return(
    <View style={styles.container}>
      <Text>We need your permission to use camera in out app</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  )
}

const handleBarCode= ({type,data}:any) => {

    console.log(type)
    console.log(data)
    
  setScanned(true)
  setBarcode(data)
}
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} barcodeScannerSettings={{barcodeTypes:["ean8","ean13"]}} facing={'front'} onBarcodeScanned={scanned ? undefined : handleBarCode}></CameraView>
      <View style={styles.barcode}>
          {scanned === true && (
            <Text>Barcode: {barcode}
            <Button title='scan again' onPress={()=>{setScanned(false)}}></Button>
            </Text>
          )}
      </View>
    
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
   
    justifyContent: 'center',
  }, camera:{
    flex:1
  },buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },barcode:{
    flex :1,
    
  }
});
