import { View, Text, Image,StyleSheet, TouchableOpacity } from "react-native";
import { timeCalc } from "../utils/TimeCalc";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env'

function DisplayData({ category }) {
    const navigation = useNavigation();

    const goToEvent = (eventId) => {
        navigation.navigate('Event', eventId);
      };

    return (
        <>
            <View style={styles.container}>
            <TouchableOpacity key={category.id} onPress={ () => goToEvent(category.id)}>
                <Image style={styles.eventImage} source={{ uri: `${BASE_URL}/${category.event_image}` }} accessibilityLabel="event name" />
                <Text style={styles.eventName}>{category.event_name}</Text>
                <Text style={styles.eventDate}>{timeCalc(category.date)}, {category.time}</Text>
                <Text style={styles.eventLocation}>{category.location} {category.country}</Text>
            </TouchableOpacity>
            </View>
        </>
    )
}
export default DisplayData;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
    },
    eventImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    eventName: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        paddingVertical:10
    },
    eventLocation: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
        paddingVertical:10

    },
    eventDate: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
    },
   
});