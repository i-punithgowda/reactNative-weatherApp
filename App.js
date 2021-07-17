import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Button  , ImageBackground , TextInput, TouchableWithoutFeedback,Keyboard} from 'react-native';
import * as Font from 'expo-font';
export default function App() {
const [img,setImg]=useState(require('./assets/images/hot.png'))
const [city,setCity]=useState('');
const [name,setName]=useState('');
const [weather,setWeather]=useState('');
const [temp,setTemp]=useState('');

Font.loadAsync({
  'encodebold':require('./assets/Fonts/encodebold.ttf')
})
function handleSearch(){
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bddf076508d7b9d42f4e96a63e8ce5d2`)
  .then((response) => response.json())
  .then((data)=>{
    if(data.cod==404){
      alert('City not found!!')
      setCity('');
      setWeather('');
      setName('');
      setTemp('');
    }else{
      setWeather(data.weather[0].main);
      setName(data.name);
      setTemp(Math.floor(data.main.temp-273)+`\u2103`);
if(data.weather[0].main==='Clouds'){
  setImg(require('./assets/images/night.png'))
}else if(data.weather[0].main==='Rain'){
  setImg(require('./assets/images/rain.png'))
}else if(data.weather[0].main==='Clear'){
  setImg(require('./assets/images/night.png'))
}else if(data.weather[0].main==='Haze'){
  setImg(require('./assets/images/hot.png'))
}

    }
 
  })
}

  return (
<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
     <StatusBar style="dark" />
<Text style={styles.header}>Weather app</Text>
  <View style={styles.searchContainer}>
  <TextInput  placeholder="Enter city" style={styles.textInput} onChangeText={(val)=>setCity(val)} defaultValue={city}  />
  <Button title="Search" color="#000" onPress={handleSearch} />
  </View>
<ImageBackground source={img} resizeMode="cover" style={styles.ImgContainer}></ImageBackground> 
<View style={styles.cityDetails} >
    <Text style={styles.cityDetText}>{name}</Text>
     <Text style={styles.cityDetText}>{weather}</Text>
     <Text style={styles.cityDetText}>{temp}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  header:{
fontSize:20,
backgroundColor:'coral',
marginTop:30,
padding:10,
textTransform:'uppercase',

},
ImgContainer:{
flex:1,
justifyContent:'center',
height:800
},
textInput:{
  padding:10,
  width:350,
  borderRadius:10,
  fontSize:15
},
searchContainer:{
  flexDirection:'row',
 
},
cityDetails:{
 marginTop:70
},

cityDetText:{
fontSize:40,
color:'#f1f1f1',
letterSpacing:10,
fontFamily:'encodebold',
textAlign:'center'
}

});
