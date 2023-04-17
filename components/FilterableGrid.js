import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Spinner from './Spinner';
import { useState } from 'react'
import GridImage from './GridImage';


export default function FilterableGrid(props) {
    const [sorted, setSorted] = useState(false)
    const [sortedBy, setSortedBy] = useState(null)

    //maps all submissions into grid images without any sorting
    function getGridImages() {
        let images = props.data.map(submission =>
          <GridImage 
            navigation = {props.navigation}
            submission = {submission}
          />
        )
        return images
    }

    //helper method to determine if a given array contains a search term at an index in the second dimension of the array (arr.[][index])
    function twoDSearch(arr, index, search) {
        if (arr.length == 0) {
            return -1
        }
        for (let i = 0; i < arr.length; i++){
            if (arr[i][index] == search) {
                return i
            }
        }
        return -1
    }

    //helper method to sort the dataset passed in props by a key provided as an argument
    //TODO: moreeee commentsssss 
    function sortData(keyToSort) {
        let sortedData = []

        for (let i = 0; i < props.data.length; i++){
            if ((twoDSearch(sortedData, 0, props.data[i][keyToSort])) == -1){
                sortedData.push(
                    [props.data[i][keyToSort], [props.data[i]]]
                )
            }
            else {
                let index = twoDSearch(sortedData, 0, props.data[i][keyToSort])
                sortedData[index][1].push(props.data[i])
            }
        }
        return (
            sortedData.map(key =>
                <View style={styles.section}>
                    <Text style={[styles.mediumText, styles.sectionTitleText]}>{key[0]}</Text>
                    <View style={styles.grid}>
                        {key[1].map(item =>
                            <GridImage
                                navigation = {props.navigation}
                                submission = {item}
                            />
                        )}
                    </View>
                </View>
            )
        )
    }

    return (
        <View style={styles.content}>
            {/* <Text>In the explore filter thing</Text> */}
            <View style={styles.filterButtonArea}>
                <FilterButton text={"Age"} filter={"ageRange"} setSorted={setSorted} setSortedBy={setSortedBy} />
                <FilterButton text={"Gender"} filter={"genderIdentity"} setSorted={setSorted} setSortedBy={setSortedBy}/>
                <FilterButton text={"Ethnicity"} filter={"ethnicBackground"} setSorted={setSorted} setSortedBy={setSortedBy}/>
                <FilterButton text={"Residence"} filter={"residence"} setSorted={setSorted} setSortedBy={setSortedBy}/>
                <FilterButton text={"Education"} filter={"educationLevel"} setSorted={setSorted} setSortedBy={setSortedBy}/>
                <TouchableOpacity 
                    style={[styles.filterButton, styles.resetButton]}
                    onPress={() => {setSorted(false); setSortedBy(null)}}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            { sorted ?
                sortData(sortedBy)
            :
                <View style={styles.grid}>
                    {getGridImages()}
                </View>
            }
        </View>
    )
}

const FilterButton = ({text, filter, setSorted, setSortedBy}) => {
    return (
      <TouchableOpacity
        onPress={
            () => {
                setSortedBy(filter)
                setSorted(true)
            }
        }
        style={styles.filterButton}
      >
        <Text style={styles.buttonText}>{text}</Text> 
      </TouchableOpacity>
    )
  }


//Theme constants
const WHITE = '#FCFAFA'
const PLATINUM = '#CED8DF'
const BLACK = '#000000'
const GREEN = '#809848'
const BLUE = '#2274A5'

const styles = StyleSheet.create({
    content: {
        alignItems: 'left'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    section: {
        paddingTop: 10,
        width: '100%',
        alignItems: 'left'
    },
    filterButtonArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        padding:5,
    },
    filterButton: {
        backgroundColor: GREEN,
        padding: 10,
        borderRadius: 8,
        textColor: WHITE,
        margin: 2,
    },
    resetButton: {
        backgroundColor: BLACK,
        textColor: WHITE,
    },
    text: {
        fontFamily: 'Avenir-Roman',
        textAlign: 'center',
    },
    bigText: {
        fontSize: 30,
        padding: '5%'
    },
    mediumText: {
        fontSize: 20
    },
    sectionTitleText: {
        paddingLeft: 10
    },
    buttonText: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold',
        color: WHITE,
        textAlign: 'center',
        fontSize: 10
    }
  })