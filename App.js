import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NewScreen from './src/screens/NewScreen';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Header from './src/components/Header';


const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator 
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
         <Stack.Screen name="New" component={NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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