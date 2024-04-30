import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonLayout from '../components/CommonLayout';
import LoginButton from '../components/LoginButton';
import DisplayBookedList from '../components/DisplayBookedList';
import { BASE_URL } from '@env'

function TicketScreen() {
    const [activeOption, setActiveOption] = useState('Upcoming');
    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [filteredEvents, setFilteredEvents] = useState([]);
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        checkUserLoggedIn();
    });

    const checkUserLoggedIn = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userId');
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
                const response = await axios.get(`${BASE_URL}/api/booking/${userId}`)
                setUserDetails(response.data);
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
                (userDetails &&
                    (<CommonLayout>
                        <ScrollView nestedScrollEnabled={true}>
                            <View style={[styles.container, { height: screenHeight }]}>
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
                                        filteredEvents.map(event => (<DisplayBookedList event={event} />))
                                    ) : (
                                        filteredEvents.map(event => (<DisplayBookedList event={event} />))
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </CommonLayout>
                    ))
                : 
                (<LoginButton />)
            }
        </>
    )
}
export default TicketScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    },
    heading: {
        color: 'white',
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
        color: 'white',
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
    ticket: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    favIcon: {
        display: 'flex',
    },
    eventName: {
        fontSize: 17,
        fontWeight: '600',
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
        padding: 20,
        fontSize: 20,
    }
});