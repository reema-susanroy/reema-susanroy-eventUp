import { View, Text, Image,StyleSheet } from "react-native";

function DisplayData({ category }) {
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/${category.event_image}` }} accessibilityLabel="event name" />
            {/* </View>
            <View > */}
                <Text style={styles.eventName}>{category.event_name}</Text>
                <Text style={styles.eventName}>{category.date}, {category.time}</Text>
                <Text style={styles.eventName}>{category.location} {category.country}</Text>
            </View>
        </>
    )
}
export default DisplayData;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    eventImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    eventName: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
});