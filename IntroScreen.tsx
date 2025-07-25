// src/screens/IntroScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Touchable, TouchableOpacity , Image} from 'react-native';
import { IntroScreenProps } from '../navigation/types'

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
    <Image
        source={require('../assets/MedGuard.png')}  // Adjust the path as necessary
        style={styles.image}
      />
    </View>

      <Text style={styles.title}>Welcome to MedGuard</Text>
      {/* <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} /> */}

      <View style={styles.textContainer}>
        <Text style={styles.text}>Our app is thoughtfully designed for senior citizens, offering essential features like medication reminders and easy access to medical documents. It empowers seniors to manage their health independently, enhancing their quality of life and providing peace of mind for both them and their families.</Text>
      </View>
      <View style={styles.Buttoncontainer}>
      <TouchableOpacity
       style={styles.loginButton}
       onPress={()=>{
        navigation.navigate('Login')
       }}>
          <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
       style={styles.signup}
       onPress={()=>{
        navigation.navigate('Signup')
       }}>
          <Text style={styles.loginText}>SIGNUP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding : 12,
    height:'100%',
    width:'100%'

  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight:'bold',
    paddingTop:9,
    alignSelf:'center',
    
    
  },
  loginText:{
    color:'white'
  },
  Buttoncontainer:{
    position: 'absolute',  // Positions the buttons at the bottom
    bottom: 100,            // Adjust the distance from the bottom
    flexDirection: 'row',   // Makes the buttons appear in a row
    justifyContent: 'space-evenly', // Adds space between the buttons
    width: '100%', 
    alignItems:'flex-end'
  },
  loginButton:{
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,   // Adds space between the buttons
    flex: 1,                // Makes the buttons stretch evenly
    alignItems: 'center',
    color:'white'
  },
  signup:{
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,   // Adds space between the buttons
    flex: 1,                // Makes the buttons stretch evenly
    alignItems: 'center',
    marginLeft:60,
   
  },
  image:{
    width : 300,
    height : 300

  },
  imageContainer:{
    justifyContent : 'center',
    alignItems:'center',
    marginTop:12,
    marginBottom:12
  },
  text:{
 fontSize : 18,
fontWeight:'200'

  },
  textContainer:{
    marginLeft:9,
    marginRight:9,
    marginTop:60

  }
  }
);
