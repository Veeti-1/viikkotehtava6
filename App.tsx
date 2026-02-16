import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React,{useState} from 'react';
export default function App() {
   const [facing, setFacing] = useState<CameraType>('back');
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
const changeCamera = () => {
  setFacing(current=>(current==='back' ? 'front':'back'))
}
const handleBarCode= ({type,data}:any) => {

    console.log(type)
  setScanned(true)
  setBarcode(data)
}
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} barcodeScannerSettings={{barcodeTypes:["ean8","ean13"]}} facing={facing} onBarcodeScanned={scanned ? undefined : handleBarCode}></CameraView>
      <View>
          {scanned === true && (
            <Text>Barcode: {barcode}
            <Button title='scan again' onPress={()=>{setScanned(false)}}></Button>
            </Text>
          )}
      </View>
      <View style={styles.buttonContainer}>
      <Button title='FlipCamera' onPress={()=>{changeCamera}}></Button>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
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
  },
});
