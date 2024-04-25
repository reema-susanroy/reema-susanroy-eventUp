import CommonLayout from '../components/CommonLayout';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginButton() {
    const navigation = useNavigation();

    const handleLogin =()=>{
        navigation.navigate('Login');
    }
    return (
        <CommonLayout>
            <View>
                <Text style={styles.loginMessage}> Kindly login to see user profile</Text>
                <Button onPress={handleLogin} style={styles.loginButton} title="Login"/>
            </View>
        </CommonLayout>
    )
}

export default LoginButton;

const styles = StyleSheet.create({
    loginMessage: {
        padding: 20,
        fontSize: 20,
    },
    loginButton:{
        width:90
    }
})