import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { timeCalc } from '../utils/TimeCalc';
import CommonLayout from '../components/CommonLayout';
import LoginButton from '../components/LoginButton';

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
                                <View>
                                    <Text style={styles.heading}> Tickets </Text>
                                    <View style={styles.options}>

                                        <TouchableOpacity onPress={() => handleCategory('Upcoming')}>
                                            <Text style={[styles.optionText, activeOption === 'Upcoming' && styles.selectedOption]}> Upcoming </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleCategory('Past')}>
                                            <Text style={[styles.optionText, activeOption === 'Past' && styles.selectedOption]}> Past</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {activeOption === 'Upcoming' ? (
                                            filteredEvents.map(event => (
                                                <View key={event.id} style={styles.viewCont}>
                                                    <Text style={styles.eventName}>{event.event_name}</Text>
                                                    <Text style={styles.eventTime}>{timeCalc(event.event_date)} at {event.event_time}</Text>
                                                </View>
                                            ))
                                        ) : (
                                            filteredEvents.map(event => (
                                                <Text key={event.id}>{event.event_name}</Text>
                                            ))
                                        )}
                                    </View>
                                </View>
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
    heading: {
        fontSize: 20,
        fontWeight: '600',
        padding: 10
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        gap: 80,
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
    selectedOption: {
        color: 'blue'
    },
    viewCont: {
        borderWidth: 1,
        borderColor: 'lightgray',
        margin: 20,
        padding: 10
    },
    eventName: {
        fontSize: 17,
        fontWeight: '600',
        paddingVertical: 10
    },
    eventTime: {
        fontSize: 13,
    },
    loginMessage:{
        // textAlign:'center',
        padding:20,
        fontSize: 20,
    }
});