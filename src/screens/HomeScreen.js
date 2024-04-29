import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Upcoming from '../components/Upcoming';
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import DisplayCategoryData from '../components/DisplayCategoryData';
import CommonLayout from '../components/CommonLayout';
import { BASE_URL } from '@env'

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
        const eventData = await axios.get(`${BASE_URL}/api/events`);
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
      const response = await axios.get(`${BASE_URL}/api/events/category/${category}`);
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
    <CommonLayout>
      <ScrollView nestedScrollEnabled={true} style={styles.outerCont}>
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
    </CommonLayout>
    </>

  )
}

const styles = StyleSheet.create({
  outerCont:{
    backgroundColor: '#3b3737',    
  },
  container: {
    borderRadius: 30,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20, 
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor:'black',   
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius:20
  },
  categoryCont: {
    display: 'flex',
  }
});
export default HomeScreen;