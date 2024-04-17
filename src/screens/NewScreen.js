import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import { timeCalc } from '../utils/TimeCalc';
import { FormatTime } from '../utils/FormatTime';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Comments from '../components/Comments';
// import pin from '../assets/pin.jpg';
// import {organizer} from '../assets/organizer.jpg';
// import calender from '../assets/calender.png';

function NewScreen({ route }) {
  console.log({ route })
  const id = route.params;

  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const [successData, setSuccessData] = useState(false);

  const [text, setText] = useState('');
  const organizer = require('../assets/organizer.jpg');
  const pin = require('../assets/pin.jpg');
  const calender = require('../assets/calender.png');

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        console.log("event details");
        const eventData = await axios.get(`http://192.168.1.67:8080/api/events/${id}`);
        setEvents(eventData.data);
        setSuccessData(true);
        setIsLoading(false);
        sethasError(false);
      } catch (error) {
        sethasError(true);
        setIsLoading(false);
        console.log("Unable to fetch event details from the database: " + error);
      }
    }
    getEventDetails();
  }, []);
  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }
  if (hasError) {
    return (
      <ErrorScreen />
    )
  }
  
  return (
    <View style={styles.container}>
      {successData &&
        <>
          <ScrollView nestedScrollEnabled={true}>
            <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/${events.event_image}` }} accessibilityLabel="event name" />
            <Text style={styles.eventName}>{events.event_name}</Text>
            <View style={styles.cont}>
              <Image style={styles.organizerImg} source={organizer} accessibilityLabel="event name" />
              <Text style={styles.eventOrganizer}>Organizer : {events.organizer}</Text>
            </View>

            <View style={styles.cont}>
              <Image style={styles.organizerImg} source={pin} accessibilityLabel="event name" />
              <Text style={styles.eventLoction}>{events.location}, {events.country}</Text>
            </View>

            <View style={styles.cont}>
              <Image style={styles.organizerImg} source={calender} accessibilityLabel="event name" />
              <Text style={styles.eventDate}>{timeCalc(events.date)} , {events.time}</Text>
            </View>
            <Text style={styles.title}>About</Text>
            <Text style={styles.eventDetails}>{events.event_description}</Text>

            <Text style={styles.title}>Discussions</Text>
            {/* <View style={styles.discussionCont}>
              <Image style={styles.avatarImage} source={{ uri: `http://192.168.1.67:8080/avatar.png` }} accessibilityLabel="event name" />
              <TextInput style={styles.input} placeholder="Start a discussion..." placeholderTextColor="gray" value={text} onChangeText={setText} />
            </View>
            <View style={styles.buttonCont}>
              <Button style={styles.button} title="Submit" onPress={handlePress} />
            </View> */}

            <Comments eventID={id} />
          </ScrollView>
        </>
      }
    </View>
  )
}
export default NewScreen;

const styles = StyleSheet.create({
  container: {
    color:'white',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    margin: 10,
    display:'flex',
    flex: 1,
    flexWrap:'wrap'
  },
  eventName: {
    padding:10,
    color:'white',
    fontSize: 28,
    fontWeight: '900',
    flexWrap: 'wrap'
  },
  eventOrganizer :{
    color:'white',
    fontSize: 16,
    padding:10,
    flex:1,
    flexWrap: 'wrap'
  },
  eventLoction :{
    padding:10,
    color:'white',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  eventDate :{
    padding:10,
    color:'white',
    fontSize: 16
  },
  eventDetails :{
    padding:10,
    color:'white',
    fontSize: 16
  },
  eventImage: {
    width: '100%',
    margin: 15,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  discussionCont: {
    padding:10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20, 
    alignItems: 'flex-end',
  },
  avatarImage: {
    width: 50,
    height: 50
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#7a6f6f4d'
  },
  buttonCont: {
    paddingHorizontal:10,
    display: 'flex',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  // button: {
  //   color:'white',
  //   width: '20%',
  //   borderRadius:90
  // },
  organizerImg: {
    width: 20,
    height: 50,
    resizeMode: 'contain',
    // borderRadius: 10,
  },
  cont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  title : {
    color:'white',
    fontSize: 16,
    fontWeight: '900',
    paddingVertical: 15
  }
});
const containerStyle = StyleSheet.create({
  button: {
    width: '20%',
    borderRadius:50
  }
})

NewScreen.navigationOptions = {
  headerShown: true, // Show the header with back button
};