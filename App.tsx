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
    <View>
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
      <CameraView barcodeScannerSettings={{barcodeTypes:["ean8","ean13"]}} facing={facing} onBarcodeScanned={scanned ? undefined : handleBarCode}></CameraView>
      <View>
          {scanned === true && (
            <Text>Barcode: {barcode}
            <Button title='scan again' onPress={()=>{setScanned(false)}}></Button>
            </Text>
          )}
      </View>
      <Button title='FlipCamera' onPress={()=>{changeCamera}}></Button>
      <StatusBar style="auto" />
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
