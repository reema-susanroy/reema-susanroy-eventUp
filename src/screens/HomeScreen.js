import React from 'react';
import { Text, View } from 'react-native';
import Upcoming from '../components/Upcoming';
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
// import {REACT_APP_BASE_URL}

function HomeScreen() {
  const [events , setEvents] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);

    useEffect(()=>{
        const getEventData = async () =>{
            try{
                const eventData = await axios.get(`http://localhost:8080/api/events`);
                setEvents(eventData.data);
                setIsLoading(false);
                sethasError(false);
                console.log(eventData.data);
            }catch(error){
                sethasError(true);
                setIsLoading(false);
                console.log("Unable to fetch services from the database: " + error);
            }        
        }
        getEventData();
    },[]);
    if(isLoading){
        return(
            <LoadingScreen />
        )
    }
    if(hasError){
        return(
            <ErrorScreen />
        )
    }

  return (
    <>
      <View>
        <Text>Welcome Home!</Text>
      </View>

      <Upcoming events={events}/>
    </>

  )
}

export default HomeScreen;