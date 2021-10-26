import React, {useEffect, useState} from "react";
import {View, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { auth } from "../firebase";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
             .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage)
            });
    }

    useEffect(() =>{
     const unsubscribe = auth.onAuthStateChanged(function(user){
            if (user) {
              navigation.replace('Contact'); 
            } else {

                navigation.canGoBack() &&
                navigation.popToTop();
              // User is signed out
              // ...
            }
          });
          return unsubscribe
    });

    return(
        <View>
            <Input placeholder='Enter Your Email'
            label='Email'
            leftIcon={{type: 'material', name:'email'}}
            value={email} 
            onChangeText={text => setEmail(text)}/>

           <Input placeholder='Enter Your Password'
            label='Password'
            leftIcon={{type: 'material', name:'lock'}}
            value={password} 
            onChangeText={text => setPassword(text)}
            secureTextEntry/>
  

            <View style={styles.loginBtn}>
              <Button title='Login' color='gold' onPress={signIn} />
            </View>
             
          <View style={styles.signUp}>
              <Button title='Sign Up' color='gold' onPress={() =>navigation.navigate('Register')} />
          </View>

          
        </View>

    )
}

const styles = StyleSheet.create({
loginBtn:{
    width: 195,
    alignSelf: 'center',
    margin: 25
},

signUp:{
    width: 195, 
    marginTop: 5,
    alignSelf: 'center'
}
})


export default LoginScreen;