
import React from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { timeCalc } from '../utils/TimeCalc';

function ConfirmButton({children, userId, eventId, eventName, eventLocation, eventFee, eventDate, eventTime, count}) {
  console.log( "Indise congfirm, ");
  const navigation = useNavigation();

    const handleBuyTicket = async () => {
        console.log('Buy Ticket pressed, ');
        const response = await axios.post(`http://192.168.1.67:8080/api/booking/${userId}` , {
            user_id : userId,
            event_id: eventId,
            event_name: eventName,
            location: eventLocation,
            event_date: eventDate,
            event_time: eventTime,
            count: count
        });
        navigation.navigate('Home');

      };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>{children}</View>

                <Button type='Confirm'/>
                <View style={styles.footer}>
              {/* <Text style={styles.feeText}>{eventFee}</Text> */}
              <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
                
            </View>
        </>
    )
}
export default ConfirmButton;

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
        backgroundColor: 'darkorange',
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
        backgroundColor: 'darkorange',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%'
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      },
  });