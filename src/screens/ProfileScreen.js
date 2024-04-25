import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import FormInput from '../components/FormInput';
import CommonLayout from '../components/CommonLayout';
import LoginButton from '../components/LoginButton';
import { Button } from 'react-native-elements';

function ProfileScreen() {
    const navigation = useNavigation();

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

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userId'); 
          navigation.replace('Login'); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    return (
        <>
            {isLoggedIn ?
                (
                    userDetails &&    
                    (
                    <>
                    <CommonLayout>
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

                    <View>
                        <Text style={styles.heading}>Settings</Text>
                        <Text style={styles.items} > Manage Events</Text>
                        <Text style={styles.items}> Manage Profile</Text>
                        <Text style={styles.items}> Account Settings</Text>
                    </View>
                    <View>
                        <Text style={styles.heading}>Support</Text>
                        <Text style={styles.items}> Help Center</Text>
                    </View>
                    <View>
                        <Text style={styles.heading}>About</Text>
                        <Text style={styles.items}> Version 1 </Text>
                    </View>
                    <View style={styles.button} >
                        <Button onPress={handleLogout} titleStyle={styles.buttonText} title='Logout'/>
                    </View>
                    </CommonLayout>
                    </>
                    )
                )
                :
                (
                    <LoginButton />
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
      heading:{
        fontSize: 16,
        fontWeight:'600',
        padding:10,
        marginTop: 25
      },
      items:{
        fontSize: 15,
        padding:10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
      },
      button:{
        margin: 20,
        width: 100,
        height: 50,
        alignSelf: 'center'
      },
      buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
      },
      loginMessage:{
        // textAlign:'center',
        padding:20,
        fontSize: 20,
    }
  });