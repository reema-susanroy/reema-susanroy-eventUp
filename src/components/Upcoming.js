import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import FilteredEvent from "./FilteredEvent";

function Upcoming({ events }) {
    const [successFilter, setSuccessFilter] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState();
    const currentDate = new Date();
    const utcCurrentString = currentDate.toISOString();

    useEffect(() => {
        const upcoming = events.filter(event => {
            const eventDate = new Date(event.date);
            const utcString = eventDate.toISOString();
            return utcString > utcCurrentString;
        });
        setFilteredEvents(upcoming);
        setSuccessFilter(upcoming.length > 0);
    }, [])
    return (
        <>
            <View style={styles.outerCont}>
            <Text style={styles.title}>Upcoming Events</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.container} >
                    {successFilter &&
                        (filteredEvents.map((events) => (
                            <FilteredEvent key={events.id} events={events} />
                        )))
                    }
                </View>
            </ScrollView>
            </View>
        </>
    )
}
export default Upcoming;

const styles = StyleSheet.create({
    outerCont:{
        // padding: 5
    },
    title:{
        fontSize:22,
        fontWeight:'600',
        backgroundColor:'black',
        color: 'white',
        padding: 10,
        paddingVertical:20
        
    },
    scrollViewContent: {
        flexGrow: 1,
       
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        // overflow: 'scroll'
    }
});