// import * as Permissions from 'expo-permissions';

import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Upcoming from '../components/Upcoming';
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import DisplayCategoryData from '../components/DisplayCategoryData';

function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [successData, setSuccessData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Sports");

  useEffect(() => {
    const getEventData = async () => {
      try {
        console.log("here");
        // const eventData = await axios.get(`http://localhost:8080/api/events`);
        // const eventData = await axios.get(`http://10.0.2.2:8080/api/events`);
        const eventData = await axios.get(`http://192.168.1.67:8080/api/events`);
        setEvents(eventData.data);
        setIsLoading(false);
        sethasError(false);
      } catch (error) {
        sethasError(true);
        setIsLoading(false);
        console.log("Unable to fetch services from the database: " + error);
      }
    }
    getEventData();
  }, []);

  const handleCategory = async (category) => {
    try {
      console.log("entered handlecategory")
      const response = await axios.get(`http://192.168.1.67:8080/api/events/category/${category}`);
      console.log(response.data)
      setCategoryData(response.data);
      setSuccessData(true);
    } catch (error) {
      console.log("Unable to load events based on category");
    }
  };

  useEffect(() => {
    handleCategory(selectedCategory);
  }, [selectedCategory]);

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
    <>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Upcoming events={events} />
          <View style={styles.categoriesContainer}>
            <Text style={styles.category} onPress={() => handleCategory('Sports')}>Sports</Text>
            <Text style={styles.category} onPress={() => handleCategory('Lifestyle')}>Lifestyle</Text>
            <Text style={styles.category} onPress={() => handleCategory('Technology')}>Technology</Text>
            <Text style={styles.category} onPress={() => handleCategory('Entertainment')}>Entertainment</Text>
          </View>
          <View style={styles.categoryCont}>
            {successData &&
              <DisplayCategoryData categoryData={categoryData} />
            }
          </View>
        </View>
      </ScrollView>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10, // Adjust this value as needed
    flexWrap: 'wrap',
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  categoryCont: {
    display: 'flex',

  }
});
export default HomeScreen;