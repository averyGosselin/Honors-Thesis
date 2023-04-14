import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TextInput, Keyboard } from 'react-native';

import FancyButton from '../components/FancyButton';

import firebase from "firebase/compat/app"

//Used for driving the image upload functionality
import UploadingData from '../components/UploadingData';
import ImageUpload from '../components/ImageUpload';
import MySelectDropdown from '../components/MySelectDropdown';

  //TODO: move these to another file and import to clean this file up
  const PREFER_NOT_TO_SAY = "Prefer not to say"
  const ageRangeOptions = [
    "Under 18",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 54",
    "55 - 64",
    "65+",
    PREFER_NOT_TO_SAY
  ]
  const genderOptions = [
    "Male",
    "Female",
    "Other", 
    PREFER_NOT_TO_SAY
  ]
  const ethnicBackgroundOptions = [
    "Asian - Eastern",
    "Asian - Indian", 
    "Black",
    "Hispanic",
    "Native American",
    "White/Caucasian",
    PREFER_NOT_TO_SAY
  ]
  const placeOfResidenceOptions = [
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
  const educationBackgroundOptions = [
    "Some High School",
    "High School Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Ph.D. or higher",
    PREFER_NOT_TO_SAY
  ]


export default function ContributeScreen({route, navigation, image, uploading, imageRationale, ageRange, genderIdentity, ethnicBackground, residence, educationLevel, setImage, setUploading, setImageRationale, setAgeRange, setGenderIdentity, setEthnicBackground, setResidence, setEducationLevel}) {

  //Function to push data recorded in the form to firebase realtime db (json) and storage (images)
  const pushRecord = async () => {
    //Require all fields be filled with some value 
    if (image != null && ageRange != null && genderIdentity != null && ethnicBackground != null &&  residence != null && educationLevel != null) {
      //This will display the uploading screen and make this page look less weird while it uploads
      setUploading(true)

      //try to upload the image and get its download url back
      const downloadUrl = await uploadImage()

      if (downloadUrl != null) {
        firebase.database().ref("nature2").push(
          {
            imageRationale,
            ageRange,
            genderIdentity,
            ethnicBackground,
            residence,
            educationLevel,
            downloadUrl
          }
        ).then(
          data => {
            //Success
            alert("Success! Your submission has been uploaded, thanks!")
          }
        ).catch(
          error => {
            //failure
            alert(`There was a problem adding your record: ${error}`);
          }
        )
        //reset all given data so when we come back to this screen nothing is filled out and we can fully restart
        setUploading(false)

        //leaving these commented out for now, will people really need them to reset?
        // setAgeRange(null)
        // setGenderIdentity(null)
        // setEthnicBackground(null)
        // setResidence(null)
        // setEducationLevel(null)
        setImageRationale(null)
      } else {
        alert("An error occurred while trying to upload your image, please try again later!")
        setUploading(false)
      }

    } else {
      //Some field hasnt been filled out, so we make demands!
      alert("give more data!")
    }
    }

  //function specific to pushing image to firebase storage
  const uploadImage = async () => {
    //need to wait for these things or weird things happen
    const response = await fetch(image.uri)
    const blob = await response.blob()

    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
    var downloadURL = null

    //Push to the storage db
    var ref = firebase.storage().ref('nature').child(filename).put(blob)
    try {
      // await ref;
      await ref
      //get the url so we can use the image on other screens
      downloadURL = firebase.storage().ref('nature').child(filename).getDownloadURL()
        try {
          await downloadURL
          setImage(null)
          return downloadURL
        } catch (e){
            console.log("this error is.. " + e)
        }
    } catch (e){
        console.log("error is: " + e)
    }
    setImage(null)
  } 


  return (
    uploading ?
      <UploadingData/>
    :
      // CREDIT: outer 3 wrappers informed by ChatGPT response to message:
      //  "write a functional react native component the encodes a screen that will be able to scroll if there is enough content on it and is a safeAreaView. style it using the react Stylesheet library"
      // Modified to meet content needs.
      <SafeAreaView 
        style={styles.page}
        onPress={Keyboard.dismiss}
      >
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

              <InputField 
                placeholder = "Please describe why you chose this image"
                changeValue = {imageRationale}
                changeFunction = {setImageRationale}
                secureTextEntry = {false}
              />
              <View style={styles.selectionArea}>
                <MySelectDropdown options={ageRangeOptions} defaultText="Age Range" onSelect={setAgeRange}/>
                <MySelectDropdown options={genderOptions} defaultText="Gender Category" onSelect={setGenderIdentity}/>
                <MySelectDropdown options={ethnicBackgroundOptions} defaultText="Ethnic Background" onSelect={setEthnicBackground}/>
                <MySelectDropdown options={placeOfResidenceOptions} defaultText="Place of Residence" onSelect={setResidence}/>
                <MySelectDropdown options={educationBackgroundOptions} defaultText="Educational Background" onSelect={setEducationLevel}/>
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

function InputField(props) {
  return (
    <TextInput
      secureTextEntry={props.secureTextEntry}
      multiline
      style = {styles.input}
      placeholder = {props.placeholder}
      value = { props.changeValue }
      onChangeText = { newVal => props.changeFunction(newVal) }
      onSubmitEditing={ Keyboard.dismiss }
      maxLength={250}
      textAlign='left'
    />
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    width: '75%',
    height: 50,
    padding: '2%',
    margin: '2%'
  },
  text: {
    fontFamily: 'Avenir-Roman',
  },
  centerText: {
    textAlign: 'center',
  },
  bigText: {
    fontSize: 30,
    // fontWeight: 'bold',
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
  }
});
