import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Footer  () {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.tab}>
        <Text>Tab 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>Tab 2</Text>
      </TouchableOpacity>
      {/* Add more tabs as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    // position: 'fixed',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white', // Adjust the background color as needed
    borderTopWidth: 1,
    // borderTopColor: '#ccc', // Adjust the border color as needed
    height: 100, // Adjust the height as needed
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    marginTop: 30
  },
});

export default Footer;