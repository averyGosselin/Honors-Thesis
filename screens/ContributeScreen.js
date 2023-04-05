import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FancyButton from '../components/FancyButton';
import { useState } from 'react';

import firebase from "firebase/compat/app"

export default function ContributeScreen({navigation}) {
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

  const pushRecord = () => {
    if (userAgeRange != null && userGender != null && userEthnicBackground != null && userPlaceOfResidence != null && userEducationBackground != null) {
      console.log(
        userAgeRange,
        userGender,
        userEthnicBackground,
        userPlaceOfResidence,
        userEducationBackground
      )
      firebase.database().ref("testPushes").push(
        {
          userAgeRange,
          userGender,
          userEthnicBackground,
          userPlaceOfResidence,
          userEducationBackground
        }
      )
      .then(
        data => {
          //Sucesss
          alert(`Record Added!`);
        }
      )
      .catch(
        error => {
          //failure
          alert(`There was a problem adding your record: ${error}`);
        }
      )} else {
      alert("give more data!")
    }
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.content}>
          <Text style={[styles.text, styles.bigText]}>Submit an Image</Text>

          <View style={styles.submissionForm}>
            <Text style={[styles.text, styles.smallText]}>Please upload an image relating to the theme of nature and fill in the following data fields.</Text>
            <TouchableOpacity style={styles.imageUploadBox} onPress={notImplementedMessage}>
              <Text style={[styles.text, styles.smallText]}>Press to upload an image</Text>
            </TouchableOpacity>
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
              onPress = {
                pushRecord
              }
            />
            {/* <Text style={[styles.text, styles.smallText]}>Select your age range: </Text>
            <Text style={[styles.text, styles.smallText]}>Select what best categorizes your gender identity: </Text>
            <Text style={[styles.text, styles.smallText]}>Select what best categorizes your ethnic background:</Text>
            <Text style={[styles.text, styles.smallText]}>Select the region you were born in: </Text>
            <Text style={[styles.text, styles.smallText]}>Select the region you currently live in: </Text> */}
          </View>

        </View>
      </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const InputField = ({question, options}) => {
  let optionList = options.map(option =>
    <Text>{option}</Text>
  )

  return (
    <View style={styles.inputField}>
      <Text style={[styles.text, styles.smallText]}>{question}</Text>
      {/* {optionList} */}
    </View>
  )
}

function notImplementedMessage(){
  alert("That isn't implemented yet!")
}

//Theme constants
const WHITE = '#FCFAFA'
const PLATINUM = '#CED8DF'
const BLACK = '#000000'
const GREEN = '#809848'
const BLUE = '#2274A5'


//Make the upload box take 2/3 of the screen width and be a nice square
const WIDTH = Dimensions.get('window').width;
const BOX_SIZE = WIDTH - Math.floor(WIDTH / 3);

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
  imageUploadBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
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
  inputField: {
    margin: 10,
    backgroundColor: WHITE,
    width: '75%',
    borderRadius: 10,
    padding: 5
  },
  selectionArea: {
    height: 300,
    justifyContent: "space-around"
  },
  dropdown1BtnStyle: {
    width: '75%',
    height: 50,
    backgroundColor: WHITE,
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
