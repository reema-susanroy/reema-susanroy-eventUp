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

function Login({ navigation, route }) {
  // const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  // const { login, googleLogin, fbLogin } = useContext(AuthContext);
  const validateInput = () => {
    if (!email || !password) {
      return false;
    } else return true;
  };
  const login = async () => {
    const validation = validateInput();
    if (validation) {
      try {
        const response = await axios.post(`http://192.168.1.67:8080/api/auth/login`, {
          contact_email: email,
          password: password,
        });
        console.log(response.data.user.id)

        if (response.data.user.id) {
          await AsyncStorage.setItem('userId', String(response.data.user.id));
          navigation.navigate('Home');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }

      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      setErrorMessage(true);
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

        {errorMessage &&
          <View >
            <Text style={styles.errorMsg}>  Kindly enter both the fields </Text>
          </View>
        }

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
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 20
  }
});