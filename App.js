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
      
      initialRouteName="Home">
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
         <Stack.Screen name="Event" component={NewScreen} />
         <Stack.Screen name="Login" options={{ title: 'Login' }}  component={Login} initialParams={{ redirectTo: null }} />
         <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="Booking" component={BookingScreen} />
         <Stack.Screen name="Ticket" component={TicketScreen} />

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
});

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});