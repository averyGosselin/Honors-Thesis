import * as React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';


function ImageGrid(props){

  return props.data.map(submission =>
    <TouchableOpacity onPress={() => 
      props.navigation.navigate('ImageScreen',
       {
        url: submission.url,
        date: submission.date,
        age: submission.submitter_user.age_range,
        gender: submission.submitter_user.gender_identity,
        ethnicity: submission.submitter_user.ethnic_background,
        placeOfOrigin: submission.submitter_user.place_of_origin,
        placeOfResidence: submission.submitter_user.place_of_residence
       }
      )
    }>
      <ImageBackground source = {submission.url}>
        <View style={styles.box}/>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default function Grid(props) {
    return  (
      <View style={styles.grid}>
        <ImageGrid data = {props.data} navigation = {props.navigation}/>
      </View>
    )
  }


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOX_SIZE = Math.floor(WIDTH / 3);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    borderColor: 'black',
    borderWidth: 1,
    height: BOX_SIZE,
    width: BOX_SIZE,
  }
})