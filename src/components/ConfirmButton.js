
import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { BASE_URL } from '@env'
import Popup from './Popup';

function ConfirmButton({children, userId, eventId, eventName, eventLocation, eventFee, eventDate, eventTime, count}) {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [charge , setCharge] =useState(false);
  useEffect(()=>{
    if(typeof(eventFee) === Number){
      setCharge(true);
    }
  },[]);


    const handleBuyTicket = async () => {
        console.log('Buy Ticket pressed, ');
        const response = await axios.post(`${BASE_URL}/api/booking/${userId}` , {
            user_id : userId,
            event_id: eventId,
            event_name: eventName,
            location: eventLocation,
            event_date: eventDate,
            event_time: eventTime,
            count: count
        });

        {showPopup && 
          <Popup/>
          setTimeout (()=>{
            navigation.navigate('Home');
          },2000)
        }
        

      };

      const calcFee =()=> {
        console.log("shoukd be here")
        const numericPart = eventFee.replace('$', '');
        const numericValue = parseInt(numericPart);
        return `$` + numericValue*count;
      }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>{children}</View>
                <Text style={styles.totalFee}>Total CAD: { eventFee !=='Free' ? calcFee() : eventFee }</Text>
                <Button type='Confirm'/>
                <View style={styles.footer}>
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
      totalFee:{
        borderTopWidth: 1,
        borderTopColor: 'gray',
        textAlign: 'right',
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 17,
        fontWeight: '600'
      }
  });