import * as React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';
import { useState } from 'react'

export default function GridImage(props) {
    const [isLoading, setIsLoading] = useState(true)

    const hideLoading = () => {
        setIsLoading(false)
    }

    return (
        <TouchableOpacity onPress={() => 
            props.navigation.navigate('ImageScreen',
             {
              url: props.submission.inAppUrl,
              age: props.submission.ageRange,
              gender: props.submission.genderIdentity,
              ethnicity: props.submission.ethnicBackground,
              placeOfOrigin: props.submission.residence,
             }
            )
          }>
            <ImageBackground source = {props.submission.inAppUrl} onLoadEnd={hideLoading}>
              <View style={styles.box}>
                <Spinner 
                  size='large' 
                  color='#809848'
                  animating={isLoading}
                />
              </View>
            </ImageBackground>
        </TouchableOpacity>
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
    justifyContent: 'center'
  }
})