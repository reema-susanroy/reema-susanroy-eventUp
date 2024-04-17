import React from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function FilteredEvent({ events  }) {
    const navigation = useNavigation();

    const goToEvent = (eventId) => {
        console.log(eventId);
        navigation.navigate('Event', eventId);
      };

    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity key={events.id} onPress={ () => goToEvent(events.id)}>
                    <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/${events.event_image}` }} accessibilityLabel="event name" />
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
        padding: '2rem',
        width: '8rem',
        margin: 10,
        position: 'relative',
        width: 120,
        height: 150,

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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
        paddingHorizontal: 10,
    },
    eventName: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
});