import React from 'react';
import { StyleSheet} from 'react-native';
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
import { Ionicons } from '@expo/vector-icons';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator   tabBar={() => <Footer />}
        screenOptions={{
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
          })}
          />
         <Stack.Screen name="Login"  component={Login} />
         <Stack.Screen style={styles.headCont} name="Event" component={NewScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }}  />
         <Stack.Screen style={styles.headCont} name="Profile" component={ProfileScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }} />
         <Stack.Screen style={styles.headCont} name="Booking" component={BookingScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }} />
         <Stack.Screen style={styles.headCont} name="Ticket" component={TicketScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }}/>
         <Stack.Screen style={styles.headCont} name="Favorite" component={FavoritesScreen} options={{ headerBackImage: () => <Ionicons style={styles.favIcon} name="arrow-back" size={30} color="black" />, }}/>

      </Stack.Navigator>
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