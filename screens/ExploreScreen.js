import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ImageScreen from './ImageScreen';
import Grid from '../components/Grid';
import FilterableGrid from '../components/FilterableGrid';
// import { data } from '../assets/natureData';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from "firebase/compat/app"
import "firebase/compat/database"

const Stack = createNativeStackNavigator();

export default function ExploreScreen({route, navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="GridScreen" component={GridScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
    </Stack.Navigator>
  )
}

const GridScreen = ( {navigation} ) => {
  const [firebaseData, setFirebaseData] = useState(null) 
  useEffect(
		() => {
			firebase
			.database()
			.ref( "newTestSet" )
			.on(
				"value",
				( snapshot ) => {
          console.log(snapshot)
					setFirebaseData( snapshot.toJSON() );
				}
			);
		},[]
	);

  const data = []
  for ( var id in firebaseData ) {
		data.push( firebaseData[id] );
	}

  return (
    // CREDIT: informed by ChatGPT response to message:
    //  "write a functional react native component the encodes a screen that will be able to scroll if there is enough content on it and is a safeAreaView. style it using the react Stylesheet library"
    // Modified to meet content needs.
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.content}>
          <Header/>
          <FilterableGrid data={data} navigation={navigation}/>
          {/* <Grid data = {data} navigation = {navigation} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Header = () => {
  return (
    <View style={styles.infoArea}>
      {/* <View>
        <Text style={[styles.text, styles.bigText]}>Welcome!</Text>
      </View>
      <Text style={styles.text}>Check out some amazing user submissions addressing the theme of nature! Use the filter options below to sort the images and see if you can find any patterns in how people approach the theme, and click on their image for more info!</Text> */}

      <Text style={[styles.text, styles.bigText]}>Gallery Theme: Nature</Text>
      <View style={styles.card}>
        <Text style={[styles.text, styles.mediumText]}>Sort By:</Text>
        {/* <View style = {styles.flexRow}>
          <Text>Age</Text>
          <Text>Birthplace</Text>
          <Text>Place of residence</Text>
        </View> */}
      </View>
    </View>
  )
}

//Theme constants
const WHITE = '#FCFAFA'
const PLATINUM = '#CED8DF'
const BLACK = '#000000'
const GREEN = '#809848'
const BLUE = '#2274A5'

const styles = StyleSheet.create({
  page: {
    backgroundColor: PLATINUM,
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  infoArea: {
    alignItems: 'center',
  },
  // card: {
  //   padding: '2%'
  // },
  text: {
    fontFamily: 'Avenir-Roman',
    textAlign: 'center',
  },
  bigText: {
    fontSize: 30,
    padding: '5%'
  },
  mediumText: {
    fontSize: 20
  },
  flexRow: {
    flexDirection: 'row'
  }
});

