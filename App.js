import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker';
import ExploreScreen from './components/ExploreScreen';
import ContributeScreen from './components/ContributeScreen';
import ProfileScreen from './components/ProfileScreen';

import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Explore">
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Contribute" component={ContributeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}