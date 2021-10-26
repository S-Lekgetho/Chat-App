import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../firebase";





export default function ContactList({navigation}){
    const [users, setUsers] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const getUsers = async () =>{
        const querySnap = await db.collection('users').get()
        const allusers = querySnap.docs.map(docSnap=> docSnap.data())
        console.log(allusers)
        setUsers(allusers)
    } 

    useEffect(() =>{
        getUsers()
    }, [])


    const RenderCard = ({item}) =>{
    return(
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <View style={styles.container}>
            
             <Image style={styles.img} source={{uri:item.image}} />
            <View>
                <Text style={styles.text}>
                    {item.name}
                </Text>
                <Text style={styles.text}>
                    {item.email}
                </Text>
            </View>
        </View>
        </TouchableOpacity>
        
    )
    }

    return(
        <View>
            <FlatList 
            data={users}
            renderItem={({item}) =>{return <RenderCard item={item}/> }   
        } 
           keyExtractor={(item)=>item.uid} />
        </View>
    )
}

const styles = StyleSheet.create({


img:{
    height: 60,
    width: 60,
    borderRadius: 30
},

text:{
    fontSize: 20,
    color: 'gold',
    backgroundColor: 'white',
    padding: 10,
    height: 45

}
})




