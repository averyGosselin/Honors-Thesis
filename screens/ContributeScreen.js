import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContributeScreen({navigation}) {
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
            <Text>Please fill out the following fields before submitting:</Text>
            <InputField question = "Question 1" options = {[1,2,3,5]}/>
            <InputField question = "Question 2" options = {[1,2,3,5]}/>
            <InputField question = "Question 3" options = {[1,2,3,5]}/>
            <InputField question = "Question 3" options = {[1,2,3,5]}/>
            <SelectDropdown
              data={['1','2','3']}
              //style={styles.selector}
              //dropdownStyle={styles.selector}
              dropdownBackgroundColor = {WHITE}
              renderDropdownIcon = {() => {
                return (
                  <Ionicons name={'chevron-down-outline'} size={'30px'} color={'grey'} />
                )
              }}
              dropdownIconPosition = {"right"}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            ></SelectDropdown>
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
  selector: {
    backgroundColor: WHITE,

  }
});

