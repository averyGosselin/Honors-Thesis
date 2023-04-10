import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import FancyButton from '../components/FancyButton';

export default function ImageScreen({route, navigation}) {

    console.log(route.params)
    const routeData = route.params;
    const downloadUrl = routeData.downloadUrl
    const date = routeData.date
    const age = routeData.age
    const gender = routeData.gender
    const ethnicity = routeData.ethnicity
    const placeOfOrigin = routeData.placeOfOrigin
    const placeOfResidence = routeData.placeOfResidence

    return (
      // CREDIT: outer 3 wrappers informed by ChatGPT response to message:
      //  "write a functional react native component the encodes a screen that will be able to scroll if there is enough content on it and is a safeAreaView. style it using the react Stylesheet library"
      // Modified to meet content needs.
      <SafeAreaView style={styles.page}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={[styles.text, styles.bigText]}>Image Page</Text>
            <Image source = {{uri: downloadUrl}} style={styles.image}/>
            <Text style={[styles.text, styles.mediumText]}>Date: {date}</Text>
            <Text style={[styles.text, styles.mediumText]}>Submitter Age Range: {age}</Text>
            <Text style={[styles.text, styles.mediumText]}>Submitter Gender Identity: {gender}</Text>
            <Text style={[styles.text, styles.mediumText]}>Submitter Ethnicity: {ethnicity}</Text>
            <Text style={[styles.text, styles.mediumText]}>Submitter Place of Origin: {placeOfOrigin}</Text>
            <Text style={[styles.text, styles.mediumText]}>Submitter Place of Residence: {placeOfResidence}</Text>
            <FancyButton 
                displayText = "Go Back"
                onPress = {navigation.goBack}
            />
          </View> 
        </ScrollView>
      </SafeAreaView>
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
  image: {
    width: "70%",
    height: "50%"
  },
  text: {
    fontFamily: 'Avenir-Roman',
    textAlign: 'center',
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: '5%'
  },
  mediumText: {
    fontSize: 20
  },
})
