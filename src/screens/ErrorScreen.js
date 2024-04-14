import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ErrorScreen = ({ errorMessage, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ErrorScreen;
