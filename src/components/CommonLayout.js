
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from './Footer';

function CommonLayout({ children }) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>{children}</View>
                <Footer />
            </View>
        </>
    )
}
export default CommonLayout;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
  });