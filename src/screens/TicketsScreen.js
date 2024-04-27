import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { timeCalc } from '../utils/TimeCalc';
import CommonLayout from '../components/CommonLayout';
import LoginButton from '../components/LoginButton';
import { Ionicons } from '@expo/vector-icons';

function TicketScreen() {
    const [activeOption, setActiveOption] = useState('Upcoming');
    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        checkUserLoggedIn();
    });

    const checkUserLoggedIn = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userId');
            console.log(userToken);
            if (userToken) {
                setIsLoggedIn(true);
                setUserId(userToken);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking user authentication:', error);
            Alert.alert('Error', 'An error occurred while checking user authentication.');
        }
    };
    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.67:8080/api/booking/${userId}`)
                setUserDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Unable to fetch data from database, " + error)
            }
        }
        if (isLoggedIn) {
            handleData();
        }
    }, [userId]);
    useEffect(() => {
        handleCategory("Upcoming")
    }, [])
    const handleCategory = (action) => {
        setActiveOption(action);
        if (userDetails) {
            const utcCurrentString = new Date().toISOString();
            if (action === 'Upcoming') {
                const filterData = userDetails.filter(event => {
                    const eventDate = new Date(event.event_date);
                    const utcString = eventDate.toISOString();
                    console.log(eventDate, utcString)
                    return utcString > utcCurrentString;
                });
                setFilteredEvents(filterData);
            } else {
                const filterData = userDetails.filter(event => {
                    const eventDate = new Date(event.event_date);
                    const utcString = eventDate.toISOString();
                    return utcString < utcCurrentString;
                });
                setFilteredEvents(filterData);
            }
        }
    }
    return (
        <>
            {isLoggedIn ?
                (
                    userDetails &&
                    (
                        <>
                            <CommonLayout>
                                <ScrollView nestedScrollEnabled={true}>

                                    <View style={styles.container}>
                                        <Text style={styles.heading}> Tickets </Text>
                                        <View style={styles.options}>

                                            <TouchableOpacity onPress={() => handleCategory('Upcoming')}>
                                                <Text style={[styles.optionText, activeOption === 'Upcoming' && styles.selectedOption]}> Upcoming </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleCategory('Past')}>
                                                <Text style={[styles.optionText, activeOption === 'Past' && styles.selectedOption]}> Past</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.ticketBox}>
                                            {activeOption === 'Upcoming' ? (
                                                filteredEvents.map(event => (
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
                                                ))
                                            ) : (
                                                filteredEvents.map(event => (
                                                    <Text key={event.id}>{event.event_name}</Text>
                                                ))
                                            )}
                                        </View>
                                    </View>
                                </ScrollView>
                            </CommonLayout>

                        </>
                    )
                )
                :
                (
                    <LoginButton />
                )
            }
        </>
    )
}
export default TicketScreen;

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