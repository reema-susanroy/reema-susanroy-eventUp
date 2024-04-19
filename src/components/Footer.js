import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Footer() {
  const navigation = useNavigation();

  const handleHome =(value)=>{
    console.log("home clicked", {value});
    navigation.navigate(`${value}`);
  }
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Home')}>
        <Ionicons name="home" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Favorites')}>
        <Ionicons name="heart" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Tickets')}>
        <Ionicons name="ticket" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Profile')}>
        <Ionicons name="person" size={20} color="gray" />
      </TouchableOpacity>
      {/* Add more tabs as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display:'flex',
    // position: 'fixed',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white', // Adjust the background color as needed
    // borderTopWidth: 1,
    // borderTopColor: '#ccc', // Adjust the border color as needed
    height: 60, // Adjust the height as needed
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
});

export default Footer;