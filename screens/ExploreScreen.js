import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import ImageScreen from './ImageScreen';
// import Grid from '../components/Grid';
import FilterableGrid from '../components/FilterableGrid';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from "firebase/compat/app"
import "firebase/compat/database"
import FancyButton from '../components/FancyButton';

import Ionicons from 'react-native-vector-icons/Ionicons';

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
			.ref( "nature2" )
			.once(
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
          <Header navigation={navigation}/>
          <FilterableGrid data={data} navigation={navigation}/>

          <View style={styles.card}>
            <Text style={[styles.text, styles.small]}>Want to grow the gallery? Navigate to the contribute tab and submit your favorite image of nature!</Text>
          </View>

          <FancyButton
            displayText={"Go Contribute!"}
            onPress={() => navigation.navigate('Contribute')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Header = ({navigation}) => {
  return (
    <View style={styles.infoArea}>
      <View style={styles.header}> 
        <TouchableOpacity onPress = {navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" color="white" size="15px"/>
        </TouchableOpacity>
        <Text style={[styles.text, styles.bigText]}> 
          Gallery Theme: Nature
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={[styles.text, styles.mediumText]}>Sort By:</Text>
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
  card: {
    padding: 10
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    flexDirection: 'row'
  },
  backButton: {
    backgroundColor: GREEN,
    padding: 10,
    borderRadius: 8,
    margin: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Avenir-Roman',
    textAlign: 'center',
  },
  bigText: {
    fontSize: 25,
    paddingBottom: '5%',
    paddingTop: '5%',
    justifyContent: 'center',
    width: '80%'
  },
  mediumText: {
    fontSize: 20
  },
  flexRow: {
    flexDirection: 'row'
  }
});

