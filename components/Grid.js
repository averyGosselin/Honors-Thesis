import * as React from 'react';
import { View, StyleSheet, Text,  ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Spinner from './Spinner';
import { useState } from 'react'
import GridImage from './GridImage';

export default function Grid(props) {
  function getGridImages() {
    let gridImages = props.data.map(submission =>
      <GridImage 
        navigation = {props.navigation}
        submission = {submission}
      />
    )
    console.log(gridImages)
    return gridImages
  }
  function alarm() {
    // alert("you did it!")
    getGridImages()
  }
  

  return  (
    <View style={styles.gridContainer}>
      <View>
        <FilterButton filterBy={alarm} text={"test"}></FilterButton>
      </View>
      <View style={styles.grid}>
        {getGridImages}
        {/* <ImageGrid data = {props.data} navigation = {props.navigation}/> */}
      </View>
    </View>
  )
}

const FilterButton = ({text, filterBy}) => {
  return (
    <TouchableOpacity
      onPress={filterBy}
    >
      <Text>{text}</Text> 
    </TouchableOpacity>
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