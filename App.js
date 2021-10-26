
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import ContactList from './screens/ContactList';
import { auth } from './firebase';
import { set } from 'react-native-reanimated';



const Stack = createNativeStackNavigator();
export default function App() {

  const [user, setUser] = useState('');

  useEffect(() =>{
    const unregister = auth.onAuthStateChanged(userExist=>{
      if(userExist) setUser(userExist)
      else setUser("")
    })

    return () =>{
      unregister()
    }

  }, [])

  

  

  return (
   <NavigationContainer>
     <Stack.Navigator>

       {user?
        <Stack.Screen name="Contact" options={{title:'Contacts', headerTitleAlign: 'center', headerTintColor:'gold'}}> 
        {props => <ContactList {...props } user={user} />}
        </Stack.Screen>
         :
         <>
         <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login', headerTitleAlign:'center'}} />
         <Stack.Screen name="Register" component={RegisterScreen} options={{title:'Register', headerTitleAlign:'center'}}  />
         </>
       }
           
            
        <Stack.Screen name="Chat" component={ChatScreen} options={{title:'Chat', headerTitleAlign:'center'}}  />
          
              
     </Stack.Navigator>
   </NavigationContainer>
  );
}


