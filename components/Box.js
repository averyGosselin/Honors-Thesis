import * as React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';


export default function Box(props) {
    return (
        // <ImageBackground source = {require('../assets/snack-icon.png')}>
        <ImageBackground source = {require(props.imageURI)}>
            <View style={styles.box}/>
        </ImageBackground>
    )
  }

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOX_SIZE = Math.floor(WIDTH / 3);

const styles = StyleSheet.create({
    box: {
        borderColor: 'black',
        borderWidth: 1,
        height: BOX_SIZE,
        width: BOX_SIZE,
      }
})