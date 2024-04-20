import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Header() {
    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems:'center' }}>
            <Image style={styles.eventImage}source={{ uri: `http://192.168.1.67:8080/avatar.png` }}/>
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
    backgroundColor: 'gray',
    width: '100%',
    height: 35,
    resizeMode: 'contain',
  },
});