import * as React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Box from './Box';

// const Stack = createStackNavigator();

const imageGrid = (submissions) => {
  return submissions.map(submission =>
    // let image = submission.url
    // <ImageBackground source = {submission.url}>

    <TouchableOpacity onPress={() => 
      alert("This image was submitted on " + submission.date + " by someone with these attributes: \n Age range: " + submission.submitter_user.age_range + " \n Gender identity: " + submission.submitter_user.gender_identity + "\n etnic background: " + submission.submitter_user.ethnic_background + "\n place of origin: " + submission.submitter_user.place_of_origin + "\n place of residence: " + submission.submitter_user.place_of_residence)
      }
    >
      <ImageBackground source = {submission.url}>
        <View style={styles.box}/>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default function Grid(props) {
    return  (
      // <NavigationContainer>
      //   <Stack.Navigator style={styles.grid}>
      <View style={styles.grid}>
          {imageGrid(props.data)}
      </View>
      //   </Stack.Navigator>
      // </NavigationContainer>
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