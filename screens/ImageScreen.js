import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import FancyButton from '../components/FancyButton';
import Spinner from '../components/Spinner';
import { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ImageScreen({route, navigation}) {

    const { url, imageRationale, age, gender, ethnicity, placeOfOrigin, educationBackground } = route.params;
    const [isLoading, setIsLoading] = useState(true)

    const hideLoading = () => {
        setIsLoading(false)
    }

    return (
      // CREDIT: outer 3 wrappers informed by ChatGPT response to message:
      //  "write a functional react native component the encodes a screen that will be able to scroll if there is enough content on it and is a safeAreaView. style it using the react Stylesheet library"
      // Modified to meet content needs.
      <SafeAreaView style={styles.page}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={[styles.text, styles.bigText]}>Image Page</Text>

            <View style={styles.imageArea}>
              <ImageBackground source={url} onLoadEnd={hideLoading}>
                <View style={styles.imageArea}>
                  <Spinner size='large' color='#809848' animating={isLoading}/>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.card}>
              <Text style={[styles.text, styles.smallText, styles.leftText, styles.paddingTop]}>{imageRationale}</Text>
              
              <View style={styles.divider}></View>

              <Text style={[styles.text, styles.mediumText]}>Submitter Data</Text>

              <ImageAttribute attribute={"Age Range"} value={age}/>
              <ImageAttribute attribute={"Gender Identity"} value={gender}/>
              <ImageAttribute attribute={"Ethnicity"} value={ethnicity}/>
              <ImageAttribute attribute={"Place of Origin"} value={placeOfOrigin}/>
              <ImageAttribute attribute={"Education Background"} value={educationBackground}/>
            </View>

            {/* <Ionicons name='ios-people' size='30px' /> */}
            
            <FancyButton 
                displayText = "Go Back"
                onPress = {navigation.goBack}
            />
          </View> 
        </ScrollView>
      </SafeAreaView>
    )
}

const ImageAttribute = ({attribute, value}) => {
  return (
    <View style={styles.imageAttribute}>
      <Text style={[styles.text, styles.smallText, styles.boldText]}>{attribute}</Text>
      <Text style={[styles.text, styles.smallText]}>{value}</Text>
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
  divider: {
    height: '.5%',
    borderRadius: 5,
    margin: 10,
    backgroundColor: "grey"
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
  imageAttribute: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageArea: {
    width: "90%",
    height: 300,
    justifyContent: 'center'
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: 'center'
  },
  paddingTop: {
    marginTop: 10
  },
  text: {
    fontFamily: 'Avenir-Roman',
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  leftText: {
    textAlign: 'left'
  },
  bigText: {
    fontSize: 30,
    padding: '5%'
  },
  mediumText: {
    fontSize: 20
  },
})
