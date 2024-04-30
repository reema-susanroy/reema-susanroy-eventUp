import { View, StyleSheet, Text, Image, ScrollView, Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonLayout from '../components/CommonLayout';
import {timeCalc} from '../utils/TimeCalc';
import { BASE_URL } from '@env'

function FavoritesScreen() {
    const [userData, setUserData] = useState();
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/events/users/favorite`);
                setUserData(response.data);

            } catch (error) {
                console.log("Unable to fetch ")
            }
        }
        handleData();
    }, [])
    return (
        <>
            <CommonLayout>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{backgroundColor:'lightgray' , height: screenHeight }} >
                        <Text style={styles.heading} >Favorites</Text>
                        {userData &&
                            userData.map((user) => (
                                <View key= {user.id}  style={styles.container}>
                                    <Image style={styles.eventImage} source={{ uri: `${BASE_URL}/${user.event_image}` }} accessibilityLabel="event name" />
                                    <View >
                                        <Text style={styles.eventName}>{user.event_name}</Text>
                                        <Text style={styles.eventTime}>{timeCalc(user.date)}, {user.time}</Text>
                                        <Text style={styles.eventLocation}>{user.location}</Text>
                                    </View>
                                </View>

                            ))}
                    </View>
                </ScrollView>
            </CommonLayout>
        </>
    )
}
export default FavoritesScreen;

const styles = StyleSheet.create({
    container:{
        margin: 20,
        display:'flex',
        flexDirection:'row',
        width: '90%',
        height:150,
        borderRadius: 10,
        backgroundColor:'gray',
    },
    heading: {
        backgroundColor:'gray',
        color:'white',
        fontSize: 20,
        fontWeight: '900',
        padding: 10,
        height: 70
    },
    eventImage: {
        margin: 20,
        width: '30%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    eventName:{
        marginVertical: 20,
        width:'60%',
        color: 'white',
        fontWeight: '600',
        overflow: 'hidden'
    },
    eventTime:{
        color: 'white'

    },
    eventLocation:{
        width:'60%',        
        color: 'white'
    }
});