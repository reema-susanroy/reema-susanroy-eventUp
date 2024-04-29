import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { timeCalc } from '../utils/TimeCalc';

function DisplayBookedList({event}) {
    return (
        <>
            <View key={event.id} style={styles.viewCont}>
                <View style={styles.ticketTop}>
                    <Text style={styles.eventName}>{event.event_name}</Text>
                    <View style={styles.ticket}>
                        <Ionicons style={styles.favIcon} name="ticket" size={20} color="black" />
                        <Text style={[styles.eventName, styles.color]}>{event.count}</Text>
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            height: 30,
                            width: 40,
                            borderRadius: 50,
                            backgroundColor: 'grey',
                        }}
                    />
                    <Text style={{ color: 'grey' }}>
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - -
                    </Text>
                    <View
                        style={{
                            height: 30,
                            width: 40,
                            borderRadius: 50,
                            backgroundColor: 'grey',
                        }}
                    />
                </View>
                <View style={styles.ticketBottom}>
                    <Text style={styles.eventTime}>{timeCalc(event.event_date)} at {event.event_time}</Text>
                    <Text style={styles.eventAmount}> CAD : {event.fee}</Text>
                </View>
            </View>
        </>
    )
}
export default DisplayBookedList;

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'gray',
    },
    heading: {
        color:'white',
        fontSize: 20,
        fontWeight: '900',
        padding: 10
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        gap: 80,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        color:'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    selectedOption: {
        color: 'blue',
    },
    ticketBox: {
        backgroundColor: 'gray'
    },
    viewCont: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderRadius: 20,
        margin: 20,
        padding: 10
    },
    ticketTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    ticket:{
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    favIcon:{
        display:'flex',
        // alignSelf:'center'
    },
    eventName: {
        fontSize: 17,
        fontWeight: '600',
        // paddingHorizontal: 20,
        paddingVertical: 5,
    },
    color: {
        color: 'blue'
    },
    eventTime: {
        fontSize: 13,
        fontWeight: '500',

    },
    eventAmount: {
        fontSize: 13,
        fontWeight: '500',

    },
    ticketBottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    loginMessage: {
        // textAlign:'center',
        padding: 20,
        fontSize: 20,
    }
});