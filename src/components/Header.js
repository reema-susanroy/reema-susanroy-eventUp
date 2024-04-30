import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BASE_URL } from '@env'

function Header() {
    return (
        <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <View style={styles.eventImage}>
            <Image style={styles.image}source={{ uri: `${BASE_URL}/Eventup-removebg-preview.png` }}/>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
eventImage: {
    backgroundColor: 'black',
    width: '100%',
    height: 58,    
  },
  image:{
    resizeMode: 'contain',
    width: '100%',
    height: 60
  }
});