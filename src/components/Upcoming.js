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
            <Text>Upcoming Events</Text>
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
        </>
    )
}
export default Upcoming;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        // overflow: 'scroll'
    }
});