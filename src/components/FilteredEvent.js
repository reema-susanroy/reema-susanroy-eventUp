import React from 'react';
import { StyleSheet} from 'react-native';
function FilteredEvent({events}){
    console.log("filterdcomponent")
    return (
        <>
        <img style={styles.eventImage} src={`http://localhost:8080/${events.event_image}`} alt="event" />
        <h3 style={styles.eventName}>{events.event_name}</h3>

        </>
    )
}

export default FilteredEvent;

const styles = StyleSheet.create({
    eventName: {
      marginRight: 10
    },
    eventImage : {
        width: '8rem'

    }
  });