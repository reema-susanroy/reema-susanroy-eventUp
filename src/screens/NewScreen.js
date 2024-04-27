import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import { timeCalc } from '../utils/TimeCalc';
import { ScrollView } from 'react-native-gesture-handler';
import Comments from '../components/Comments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BuyTicketLayout from '../components/BuyTickeLayout';
// import { HeaderBackButton } from '@react-navigation/stack';
import Config from 'react-native-config';
// import {BASE_URL} from '@env'

function NewScreen({ route }) {
  // const { BASE_URL } = process.env;
  // console.log("Checking base url here", {BASE_URL});
  const id = route.params;
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const [successData, setSuccessData] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState();
  const [userId, setUserId] = useState();
  const [status, setStatus] = useState();
  const [isFavorite, setIsFavorite] = useState(0);
  const { windowHeight } = Dimensions.get('window');
  useEffect(() => {
    checkUserLoggedIn();
  });
  const checkUserLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userId');
      if (userToken) {
        setIsLoggedIn(true);
        setUserId(userToken);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking user authentication:', error);
      Alert.alert('Error', 'An error occurred while checking user authentication.');
    }
  };
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const eventData = await axios.get(`http://192.168.1.67:8080/api/events/${id}`);
        console.log(eventData.data)
        setEvents(eventData.data);
        setIsFavorite(eventData.data.isFavorite);
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

  const toggleIcon = async () => {
    try {
      console.log("entered toggleFav")
      const response = await axios.put(`http://192.168.1.67:8080/api/events/${events.id}/favorite`, {
        isFavorite: !isFavorite
      });
      setIsHeartFilled(!isHeartFilled);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }

    
  }
// };

const handleBuyTicket = () => {
  // Implement your logic to handle the ticket purchase
  console.log('Buy Ticket pressed');
};
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
        <BuyTicketLayout userId={userId} eventId={id} eventName={events.event_name} eventLocation={events.location} eventFee={events.fee} eventDate={events.date} eventTime={events.time}>
          <ScrollView nestedScrollEnabled={true}>

            <Image style={styles.eventImage} source={{ uri: `http://192.168.1.67:8080/${events.event_image}` }} accessibilityLabel="event name" />
            <TouchableOpacity onPress={toggleIcon}>
              {isHeartFilled ? (
                <Ionicons style={styles.favIcon} name="heart-circle" size={40} color="red" />
              ) : (
                <Ionicons style={styles.favIcon} name="heart-circle-outline" size={40} color="black" />
              )}
            </TouchableOpacity>

            <Text style={styles.eventName}>{events.event_name}</Text>
            <View style={styles.cont}>
              <Ionicons name="folder-open-outline" size={25} color="white" />
              <Text style={styles.eventOrganizer}>Organizer : {events.organizer}</Text>
            </View>

            <View style={styles.cont}>
              <Ionicons name="location-outline" size={25} color="white" />
              <Text style={styles.eventLoction}>{events.location}, {events.country}</Text>
            </View>

            <View style={[styles.cont, styles.border]}>
              <Ionicons name="calendar-outline" size={25} color="white" />
              <Text style={styles.eventDate}>{timeCalc(events.date)} , {events.time}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.title}>About this event</Text>
              <Text style={styles.eventDetails}>{events.event_description}</Text>
              {/* <Ionicons name="heart-sharp heart-outline" size={32} color="red" /> */}
            </View>
            <Text style={styles.title}>Discussions</Text>
            <Comments eventID={id} />
          </ScrollView>
        </BuyTicketLayout>
      </>
    }
  </View>
)
}
export default NewScreen;

const styles = StyleSheet.create({
  container: {
    color: 'white',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 20,
    margin: 10,
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    position: 'relative'

  },
  eventName: {
    padding: 10,
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    flexWrap: 'wrap'
  },
  eventOrganizer: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    flex: 1,
    flexWrap: 'wrap'
  },
  eventLoction: {
    padding: 10,
    color: 'white',
    fontSize: 16,
    flexWrap: 'wrap'
  },
  eventDate: {
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  eventDetails: {
    padding: 10,
    color: 'white',
    fontSize: 16
  },
  eventImage: {
    width: '100%',
    // margin: 15,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  discussionCont: {
    padding: 10,
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
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  organizerImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    backgroundColor: 'lightgray'
  },
  cont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  border: {
    borderWidth: 1,
    borderBottomColor: '#7a6f6f4a',
    paddingBottom: 20
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    paddingVertical: 15
  },
  favIcon: {
    position: 'absolute',
    bottom: 5,
    right: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
const containerStyle = StyleSheet.create({
  button: {
    width: '20%',
    borderRadius: 50
  }
})

NewScreen.navigationOptions = {
  headerShown: true, // Show the header with back button
};