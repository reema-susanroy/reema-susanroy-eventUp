import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = React.useState(route.name);

  const handleHome = (value) => {
    setSelected(value);
    navigation.navigate(`${value}`);
  }
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Home')}>
        <Ionicons name="home" size={20} color={selected === 'Home' ? 'red' : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Favorite')}>
        <Ionicons name="heart" size={20} color={selected === 'Favorite' ? 'red' : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Ticket')}>
        <Ionicons name="ticket" size={20} color={selected === 'Ticket' ? 'red' : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handleHome('Profile')}>
        <Ionicons name="person" size={20} color={selected === 'Profile' ? 'red' : 'gray'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
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