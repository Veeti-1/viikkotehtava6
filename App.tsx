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
      <Text>We need your permission to use camera in our app</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  )
}

const handleBarCode= ({type,data}:any) => {
  setScanned(true)
  setBarcode(data)
}
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} barcodeScannerSettings={{barcodeTypes:["ean8","ean13"]}} facing={'back'} onBarcodeScanned={scanned ? undefined : handleBarCode}/>
      </View>
      {scanned === true && (
      <View style={styles.barcode}>  
        <View>
          <Text style={styles.text} >Barcode: {barcode}</Text>
        </View>
        <View>
          <Button title='scan again' onPress={()=>{setScanned(false)}}></Button>
        </View>
        </View>
          )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
  flex: 1,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  },
  cameraContainer:{
  backgroundColor:'transparent',
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  width:'100%',
  },
  camera:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  width:'100%',
  backgroundColor:'transparent',
  }

  ,barcode:{
  position: 'absolute',
  bottom: 64,
  backgroundColor:'#00000067',
  borderColor:'#000',
  borderWidth:1,
  alignItems:'center',
  padding:10,
  },
  text:{
  fontSize:16,
  color:'#ffff',
  }
});
