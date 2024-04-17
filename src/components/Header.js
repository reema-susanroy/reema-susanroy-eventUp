import React from 'react';
import { View, Text } from 'react-native';

function Header() {
    return (
        <View style={{ flexDirection: 'row', height: 60, alignItems:'center' }}>
            <View style={{ display:'flex' , justifyContent: 'space-between', alignItems: 'center',}} >
                <Text>Welcome, User</Text>
            </View>
            <View style={{ backgroundColor: 'red', padding: 5, }}>
                {/* Dropdown content */}
            </View>
        </View>
    );
};

export default Header;