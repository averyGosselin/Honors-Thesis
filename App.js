import * as React from 'react';
import ExploreScreen from './screens/ExploreScreen';
import ContributeScreen from './screens/ContributeScreen';
import ProfileScreen from './screens/ProfileScreen';

import { useState } from 'react'

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"
import firebaseConfiguration from './secret';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';


if (!firebase.apps.length) firebase.initializeApp( firebaseConfiguration );

const Tab = createBottomTabNavigator();

export default function App() {
  const WHITE = '#FCFAFA'
  const PLATINUM = '#CED8DF'
  const BLACK = '#000000'
  const GREEN = '#809848'
  const BLUE = '#2274A5'

  const [ image, setImage ] = useState(null)
  const [ uploading, setUploading ] = useState(false)

  const [ imageRationale, setImageRationale ] = useState(null)
  const [ ageRange, setAgeRange ] = useState(null)
  const [ genderIdentity, setGenderIdentity ] = useState(null)
  const [ ethnicBackground, setEthnicBackground ] = useState(null)
  const [ residence, setResidence] = useState(null)
  const [ educationLevel, setEducationLevel ] = useState(null)

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Explore"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: BLACK,
            height: '10%'
          },
          tabBarActiveTintColor: WHITE,
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = '30px'

            if (route.name === 'Explore') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Contribute') {
              iconName = focused 
                ? 'add-circle' 
                : 'add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused 
                ? 'person' 
                : 'person-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >

        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Contribute"
          children={() => 
            <ContributeScreen
              image = {image}
              uploading = {uploading}
              imageRationale = {imageRationale}
              ageRange = {ageRange}
              genderIdentity = {genderIdentity}
              ethnicBackground = {ethnicBackground}
              residence = {residence}
              educationLevel = {educationLevel}

              setImage = {setImage}
              setUploading = {setUploading}
              setImageRationale = {setImageRationale}
              setAgeRange = {setAgeRange}
              setGenderIdentity = {setGenderIdentity}
              setEthnicBackground = {setEthnicBackground}
              setResidence = {setResidence}
              setEducationLevel = {setEducationLevel}
            />
          }
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}