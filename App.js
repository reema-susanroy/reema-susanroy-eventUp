import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NewScreen from './src/screens/NewScreen';
import Login from './src/screens/Login';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { AuthProvider } from './src/navigation/AuthProvider';
import ProfileScreen from './src/screens/ProfileScreen';
import BookingScreen from './src/screens/BookingScreen';
import TicketScreen from './src/screens/TicketsScreen';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <AuthProvider>
    <NavigationContainer>
      {/* <Tab.Navigator tabBar={() => <Footer />}> */}
      <Stack.Navigator   tabBar={() => <Footer />}
        screenOptions={{
          headerStyle:{
            // backgroundColor: '#228CDB'
          },
          headerTintColor: '#fff',
          headerTitle: ""
        }
      }
      
      initialRouteName="Login">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({navigation}) => ({
            headerLeft: () => <Header />,
            // headerRight: () => (
            //   <Icon 
            //     name="plus" 
            //     type="feather" 
            //     color="#fff"
            //     style={style.headerIcon}
            //     onPress={() => navigation.navigate('New')}
            //   />
            // )
          })}
          />
         <Stack.Screen name="Login"  component={Login} />
         <Stack.Screen style={styles.headCont} name="Event" component={NewScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }}  />
         <Stack.Screen style={styles.headCont} name="Profile" component={ProfileScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }} />
         <Stack.Screen style={styles.headCont} name="Booking" component={BookingScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }} />
         <Stack.Screen style={styles.headCont} name="Ticket" component={TicketScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }}/>

      </Stack.Navigator>
      {/* </Tab.Navigator> */}
    </NavigationContainer>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 10
  },
  headCont:{
    backgroundColor: 'black',
  }
});

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});