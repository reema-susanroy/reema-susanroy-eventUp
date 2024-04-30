import React from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env'

function FilteredEvent({ events  }) {
    const navigation = useNavigation();

    const goToEvent = (eventId) => {
        navigation.navigate('Event', eventId);
      };

    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity key={events.id} onPress={ () => goToEvent(events.id)}>
                    <Image style={styles.eventImage} source={{ uri: `${BASE_URL}/${events.event_image}` }} accessibilityLabel="event name" />
                    <View style={styles.eventOverlay} >
                        <Text style={styles.eventName}>{events.event_name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default FilteredEvent;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 5,
        position: 'relative',
        width: 190,
        height: 230,
        padding:8,
        borderRadius:10,
        elevation:10,
        shadowOpacity: 1,
        shadowRadius:5,
        shadowOffset: { width: 5, height: 6 }, 
        shadowColor:'black',

    },
    eventImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    eventOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        borderRadius:10
    },
    eventName: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
});