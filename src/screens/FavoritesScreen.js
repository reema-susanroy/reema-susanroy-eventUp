import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommonLayout from '../components/CommonLayout';

function FavoritesScreen() {
    const [userData, setUserData] = useState();
    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.67:8080/api/events/users/favorite`);
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
                    <View>
                        <Text>Favorites</Text>
                        {userData &&
                            userData.map((user) => (
                                <View style={styles.container}>
                                    <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/${user.event_image}` }} accessibilityLabel="event name" />
                                    <View >
                                        <Text>{user.event_name}</Text>
                                        <Text>{user.date}, {user.time}</Text>
                                        <Text>{user.location}</Text>
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
        display:'flex',
        flexDirection:'row',
        gap: 10
    },
    eventImage: {
        width: '30%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    }
});