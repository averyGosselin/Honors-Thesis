// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen.js';
import GalleryScreen from './screens/GalleryScreen.js';
import SubmissionScreen from './screens/SubmissionScreen.js';
import AccountScreen from './screens/AccountScreen.js';
import CreateAccountScreen from './screens/CreateAccountScreen.js';
//import {HomeScreen, GalleryScreen, SubmissionScreen, AccountScreen, CreateAccountScreen} from './screens'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="GalleryScreen" 
          component={GalleryScreen} 
        />
        <Stack.Screen
          name="SubmissionScreen"
          component={SubmissionScreen}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
        />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;