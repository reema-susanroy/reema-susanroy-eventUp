import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import FormInput from '../components/FormInput';

function ProfileScreen() {
    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        checkUserLoggedIn();        
    });
    const checkUserLoggedIn = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userId');
            console.log(userToken);
            if (userToken) {
                setIsLoggedIn(true);
                setUserId(userToken);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking user authentication:', error);
            Alert.alert('Error', 'An error occurred while checking user authentication.');
        }
    };
    useEffect(()=>{
        const getUserDetails = async ()=>{
            try{
                const response = await axios.get(`http://192.168.1.67:8080/api/users/${userId}`);
                setUserDetails(response.data[0]);
            }catch(error){
                console.log("Unable to fetch user details, "+error);
            }
        }
        if(isLoggedIn){
            getUserDetails();
        }
    },[userId]);
    // console.log(userDetails.user_name)
    return (
        <>
            {isLoggedIn ?
                (
                    userDetails &&    
                    (
                    <>
                    <View >
                        {/* <Text style={styles.footer}></Text> */}
                        <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/avatar.png` }} accessibilityLabel="event name" />
                    </View>
                    <View style={styles.text}>
                        <Text style={[styles.text , styles.name]} >{userDetails.user_name}</Text>
                        <Text style={styles.text}> {userDetails.contact_email}</Text>

                        {/* <Text style={styles.text}> {userDetails.contact_phone}</Text>
                        <Text style={styles.text}> {userDetails.user_address}</Text>
                        <Text style={styles.text}> {userDetails.country}</Text> */}



                    </View>
                    </>
                    )
                )
                :
                (
                    <View>
                        <Text> Kindly login to see user priofile</Text>
                    </View>
                )
            }


        </>
    )
}
export default ProfileScreen;
const styles = StyleSheet.create({
    footer: {
      backgroundColor: 'white', 
    },
    text: {
      color: 'black',
      fontSize: 20,
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center'
    },
    name:{
        fontSize: 27,
        fontWeight: '600',
    },  
    eventImage: {
        width: '100%',
        height: 65,
        resizeMode: 'contain',
      },
  });