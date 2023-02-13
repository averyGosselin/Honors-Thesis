import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Pressable, Button, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker';

const test = () => {
  alert("Spriggon")
}

export default function ExploreScreen({navigation}) {
  return (
    <View style={styles.content}>
      <Header/>
      <Grid items={['one', 'two', 'three', 'four', 'five','six', '7', '8', '9', '10', '11', '12', '13', '14','15','16','17','18','19']}/>
    </View>
  )
}

//TODO: Make this so I can scroll all the way down
const Grid = (props) => {
  let toReturn = [];

  for (let i = 0; i < props.items.length; i++) {
    toReturn.push(new Box(item = props.items[i]))
  }
  return  (<ScrollView>
                <View style={styles.grid}>{toReturn}</View>
          </ScrollView>);
}

//TODO: make this make more use of given props
const Box = (props) => {
  return (
    <View style={styles.box}>
      <View style={styles.boxImageArea}></View>
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.infoArea}>
        <View style={styles.selectorArea}>
          <Text style={styles.themeText}>Theme: </Text>
          <View style={styles.picker}><Text>Future dropdown selector</Text></View>
          {/* <Picker>
            <Picker.Item label="Test 1" value="test1" />
            <Picker.Item label="Test 2" value="test2" />
          </Picker> */}
        </View>
        <View style={styles.themeInfo}>
          <Text style={styles.themeInfoText}>This is where a brief, nice description of the selected theme will be rendered when one is selected</Text>
        </View>
    </View>
  )
}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOX_SIZE = Math.floor(WIDTH / 4);

const WHITE = '#FEF9FF'
const PINK = '#F2DFD7'

const styles = StyleSheet.create({
  content: {
    backgroundColor: WHITE
  },
  infoArea: {
    height: 200
  },
  selectorArea: {
    padding: 10,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'green'
  },
  picker: {
    justifyContent: 'center'
  },
  themeText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  themeInfo: {
    backgroundColor: PINK,
    width: WIDTH * .9,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5,
  },
  themeInfoText: {
    fontSize: 15
  },
  grid: {
    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    borderColor: 'black',
    backgroundColor: 'grey',
    borderWidth: 1,
    height: BOX_SIZE,
    width: BOX_SIZE,
  }
});

