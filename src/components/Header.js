import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BASE_URL } from '@env'

function Header({ children }) {
    return (
        <View style={{ flexDirection: 'row', alignItems:'center' }}>
            {/* <Text >EventUp</Text> */}
            <View style={styles.eventImage}>
            <Image style={styles.image}source={{ uri: `${BASE_URL}/Eventup-removebg-preview.png` }}/>

            </View>

            {/* <View style={{ display:'flex' , justifyContent: 'space-between', alignItems: 'center',}} >
                <Text>Welcome, User</Text>
            </View>
            <View style={{ backgroundColor: 'red', padding: 5, }}> */}
                {/* Dropdown content */}
            {/* </View> */}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
eventImage: {
    backgroundColor: 'black',
    width: '100%',
    height: 58,
    // aspectRatio: 16 / 3,
    
  },
  image:{
    resizeMode: 'contain',
    width: '100%',
    height: 60
    // aspectRatio: 16 / 3,
  }
});