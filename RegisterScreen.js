import React, {useState} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import { auth, db } from '../firebase';


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    

const register = () => {
    auth.createUserWithEmailAndPassword( email, password)
  .then((userCredential) => {
     const user = userCredential.user;
     return db.collection('users').doc(user.uid).set({
       uid: user.uid,
       name: name,
       email: user.email,
       imageURL: 'https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg'
     })
   /* user.updateProfile({
        displayName: name,
        photoURL: imageURL? imageURL: "https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg"
      }).then(() => {
        // Profile updated!
        alert("Profile Successfully Created and Signed in!!")
      }).catch((error) => {
        // An error occurred
        // ...
      });
      
    // ...
    navigation.popToTop();*/
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
}

    return(
        <View>
            <Input placeholder='Enter Your Name'
            label='Name'
            leftIcon={{type: 'material', name:'badge'}}
            value={name} 
            onChangeText={text => setName(text)}
            />

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

           <Input placeholder='Enter Your Image URL'
            label='Profile Picture'
            leftIcon={{type: 'material', name:'face'}}
            value={imageURL} 
            onChangeText={text => setImageURL(text)}
            />
  

            <View style={styles.signUp}>
              <Button title='Sign Up' color='gold'onPress={register} />
            </View>
             
         
          
        </View>

    )
}
export default RegisterScreen;
const styles = StyleSheet.create({
signUp:{
    width: 195, 
    marginTop: 5,
    alignSelf: 'center'
},

})


