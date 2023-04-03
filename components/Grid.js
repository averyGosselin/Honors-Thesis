import * as React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';
import { useState } from 'react'
import GridImage from './GridImage';


export default function Grid(props) {
  return  (
    <View style={styles.grid}>
      <ImageGrid data = {props.data} navigation = {props.navigation}/>
    </View>
  )
}


function ImageGrid(props){
  return props.data.map(submission =>
    <GridImage 
      navigation = {props.navigation}
      submission = {submission}
    />
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})