import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import ConfirmButton from "../components/ConfirmButton";
import { timeCalc } from "../utils/TimeCalc";

function BookingScreen({ route }) {
    const eventName = route.params.eventName;
    const eventFee = route.params.eventFee;
    const eventDate = route.params.eventDate;
    const eventTime = route.params.eventTime;
    const eventId = route.params.eventId;
    const userId = route.params.userId;
    const eventLocation = route.params.eventLocation;
    
    const [count, setCount] = useState(1);
    const incrementCounter = () => {
        setCount(count + 1);
    };

    const decrementCounter = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    return (
        <> 
        <ConfirmButton userId={userId} eventId={eventId} eventName={eventName} eventLocation={eventLocation} eventFee={eventFee} eventDate={eventDate} eventTime={eventTime} count={count}>
            <View>
                <Text style={styles.name}>{eventName}</Text>
                <Text style={styles.date}> {timeCalc(eventDate)}, {eventTime}</Text>
            </View>

            <View style={styles.box}>
                <View style={styles.outerContainer} >
                    <View >
                        <Text style={styles.admission}> General Admission</Text>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={decrementCounter}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counter}>{count}</Text>
                        <TouchableOpacity style={styles.button} onPress={incrementCounter}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.feeCont}>
                    <Text style={styles.fee}>{eventFee} </Text>
                </View>
            </View>
        </ConfirmButton>
        </>
    )
}
export default BookingScreen;
const styles = StyleSheet.create({
    box: {
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'blue',
        margin: 40,
        borderRadius: 10
    },
    outerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        gap: 50,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    counter: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        paddingVertical: 10,

    },
    date: {
        fontSize: 14,
        textAlign: 'center'

    },
    admission: {
        fontSize: 16,
        fontWeight: '400'
    },
    feeCont: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    fee: {
        fontSize: 16
    },
    confirmButton: {
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    confirmButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        paddingVertical: 15,
      },
      confirmButtonText: {
        color: 'white',
        fontSize: 18,
      },
});