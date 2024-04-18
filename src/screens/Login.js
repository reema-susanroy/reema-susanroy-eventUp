import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import FormInput from '../components/FormInput';
// import FormButton from '../components/FormButton';
// import SocialButton from '../components/SocialButton';
// import { AuthContext } from '../navigation/AuthProvider';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const { login, googleLogin, fbLogin } = useContext(AuthContext);

    const login =async ()=>{
        console.log("Auntehntication pening");
        try {
            const response = await axios.post( `http://192.168.1.67:8080/api/auth/login`, {
            contact_email: email,
            password: password,
            });
            console.log(response.data.user.id)
           
            if (response.data.user.id) {
                // Store userId in AsyncStorage or React Context
                await AsyncStorage.setItem('userId', String(response.data.user.id));
                // Navigate to the main app screen
                navigation.navigate('Event');
              } else {
                // Authentication failed, display error message
                Alert.alert('Login Failed', 'Invalid email or password');
              }
              
          } catch (error) {
            console.error('Error during login:', error);
          }
    }
    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>

                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormInput
                    labelValue={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />

                <Button
                    title='Login'
                    onPress={() => login(email, password)}
                />
                {/* <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                    <Text style={styles.navButtonText}>Forgot Password?</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={styles.forgotButton}
                    >
                    <Text style={styles.navButtonText}>
                        Don't have an acount? Create here
                    </Text>
                </TouchableOpacity>


            </ScrollView>
        </>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
  });