
import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';

function BuyTicketLayout({children}) {
    const handleBuyTicket = () => {
        // Implement your logic to handle the ticket purchase
        console.log('Buy Ticket pressed');
      };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>{children}</View>
                <View style={styles.footer}>
              <Text style={styles.feeText}>Fee: events.fee</Text>
              <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
                <Text style={styles.buttonText}>Get Ticket</Text>
              </TouchableOpacity>
            </View>
                
            </View>
        </>
    )
}
export default BuyTicketLayout;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    text:{
        color:'white'
    },
    footer: {
        // position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
      },
      feeText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      buyButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });