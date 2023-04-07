import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FancyButton from '../components/FancyButton';

import firebase from "firebase/compat/app"

//Used for driving the image upload functionality
import UploadingData from '../components/UploadingData';
import ImageUpload from '../components/ImageUpload';


export default function ContributeScreen({navigation}) {
  const [ image, setImage ] = useState(null)
  const [ uploading, setUploading ] = useState(false)

  const [ userAgeRange, setUserAgeRange ] = useState(null)
  const [ userGender, setUserGender ] = useState(null)
  const [ userEthnicBackground, setUserEthnicBackground ] = useState(null)
  const [ userPlaceOfResidence, setUserPlaceOfResidence] = useState(null)
  const [ userEducationBackground, setUserEducationBackground ] = useState(null)

  const updateAgeRange = (age) => {
    setUserAgeRange(age)
  }
  const updateUserGender = (gender) => {
    setUserGender(gender)
  }
  const updateUserEthnicBackground = (ethncicBackground) => {
    setUserEthnicBackground(ethncicBackground)
  }
  const updateUserPlaceOfResidence = (placeOfResidence) => {
    setUserPlaceOfResidence(placeOfResidence)
  }
  const updateUserEducationBackground = (educationBackground) => {
    setUserEducationBackground(educationBackground)
  }
  
  //TODO: move these to another file and import to clean this file up
  const PREFER_NOT_TO_SAY = "Prefer not to say"
  const ageRanges = [
    "Under 18",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 54",
    "55 - 64",
    "65+",
    PREFER_NOT_TO_SAY
  ]
  const gender = [
    "Male",
    "Female",
    "Other", 
    PREFER_NOT_TO_SAY
  ]
  const ethnicBackground = [
    "Asian - Eastern",
    "Asian - Indian", 
    "Black",
    "Hispanic",
    "Native American",
    "White/Caucasian",
    PREFER_NOT_TO_SAY
  ]
  const placeOfResidence = [
    "Africa",
    "Caribbean/Pacific Islands",
    "Central Asia",
    "East Asia",
    "Europe",
    "Middle East",
    "North America/Central America",
    "Oceania",
    "South America",
    "South East Asia",
    PREFER_NOT_TO_SAY
  ]
  const educationBackground = [
    "Some High School",
    "High School Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Ph.D. or higher",
    PREFER_NOT_TO_SAY
  ]

  //Function to push data recorded in the form to firebase realtime db (json) and storage (images)
  const pushRecord = () => {
    //Require all fields be filled with some value 
    if (image != null && userAgeRange != null && userGender != null && userEthnicBackground != null && userPlaceOfResidence != null && userEducationBackground != null) {
      //pull out the image url to store in the json and be able to connect them later
      const url = image.uri.substring(image.uri.lastIndexOf('/')+1)
      firebase.database().ref("testPushes").push(
        {
          userAgeRange,
          userGender,
          userEthnicBackground,
          userPlaceOfResidence,
          userEducationBackground,
          url
        }
      ).then(
        data => {
          //Sucess
          //If we have successfully pushed the data, then we also push the image
          // TODO: is there a better place to put this?
          uploadImage()
        }
      ).catch(
        error => {
          //failure
          alert(`There was a problem adding your record: ${error}`);
        }
      )
      //reset all given data so when we come back to this screen nothing is filled out and we can fully restart
      setUserAgeRange(null)
      setUserGender(null)
      setUserEthnicBackground(null)
      setUserPlaceOfResidence(null)
      setUserEducationBackground(null)

    } else {
      //Some field hasnt been filled out, so we make demands!
      alert("give more data!")
    }
    }

  //function specific to pushing image to firebase storage
  const uploadImage = async () => {
    //This will display the uploading screen and make this page look less weird while it uploads
    setUploading(true)

    //need to wait for these things or weird things happen
    const response = await fetch(image.uri)
    const blob = await response.blob()

    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
    var ref = firebase.storage().ref().child(filename).put(blob)
    try {
      await ref;
      alert("Success! Your submission has been uploaded, thanks!")
    } catch (e){
        console.log(e)
    }
    //reset so contribute page comes back up, clear of all previously submitted data
    setUploading(false)
    setImage(null);
  } 


  return (
    uploading ?
      <UploadingData/>
    :
      // CREDIT: outer 3 wrappers informed by ChatGPT response to message:
      //  "write a functional react native component the encodes a screen that will be able to scroll if there is enough content on it and is a safeAreaView. style it using the react Stylesheet library"
      // Modified to meet content needs.
      <SafeAreaView style={styles.page}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={[styles.text, styles.bigText]}>Submit an Image</Text>

            <View style={styles.submissionForm}>
              <Text style={[styles.text, styles.smallText]}>Please upload an image relating to the theme of nature and fill in the following data fields.</Text>
              <ImageUpload
                image = {image}
                setter = {setImage}
              />
              <Text style={[styles.text, styles.smallText]}>Please fill out the following fields before submitting:</Text>

              <View style={styles.selectionArea}>
                <MySelectDropdown 
                  options={ageRanges}
                  defaultText="Age Range"
                  onSelect={updateAgeRange}
                />
                <MySelectDropdown 
                  options={gender}
                  defaultText="Gender Category"
                  onSelect={updateUserGender}
                />
                <MySelectDropdown 
                  options={ethnicBackground}
                  defaultText="Ethnic Background"
                  onSelect={updateUserEthnicBackground}
                />
                <MySelectDropdown 
                  options={placeOfResidence}
                  defaultText="Place of Residence"
                  onSelect={updateUserPlaceOfResidence}
                />
                <MySelectDropdown 
                  options={educationBackground}
                  defaultText="Educational Background"
                  onSelect={updateUserEducationBackground}
                />
              </View>

              <FancyButton
                displayText = "Submit"
                onPress = {pushRecord}
              />
            </View>
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
  submissionForm: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Avenir-Roman',
  },
  centerText: {
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
  smallText: {
    fontSize: 15
  },
  flexRow: {
    flexDirection: 'row'
  },
  selectionArea: {
    height: 300,
    justifyContent: "space-around"
  },
  dropdown1BtnStyle: {
    width: '75%',
    height: 50,
    backgroundColor: PLATINUM,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black"
  },
  dropdown1BtnTxtStyle: {
    color: BLACK,
    fontSize: 15, 
    textAlign: 'left',
    fontFamily: 'Avenir-Roman',
  },
  dropdown1RowStyle: {
    backgroundColor: WHITE, 
    borderBottomColor: PLATINUM,
  }
});



function MySelectDropdown(props) {

  return (
    <SelectDropdown
      data={props.options}
      defaultButtonText={props.defaultText}
      buttonStyle={styles.dropdown1BtnStyle}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      rowStyle={styles.dropdown1RowStyle}
      dropdownIconPosition = {"right"}

      renderDropdownIcon = {isOpened => {
        return (
          <Ionicons name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'} size={'30px'} color={'grey'} />
        )
      }}
      onSelect={(selectedItem, index) => {
        props.onSelect(selectedItem)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem
      }}
      rowTextForSelection={(item, index) => {
        return item
      }}
      ></SelectDropdown>
  )
}
