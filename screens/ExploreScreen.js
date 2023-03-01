import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Grid from '../components/Grid';
import { data } from '../assets/data';


export default function ExploreScreen({navigation}) {
  return (
    <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <SafeAreaView>
            <Header/>
            <Grid data = {data}/>
          </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.infoArea}>
      <View>
        <Text style={[styles.text, styles.bigText]}>Welcome!</Text>
      </View>
      <Text style={styles.text}>Check out some amazing user submissions addressing the theme of nature! Use the filter options below to sort the images and see if you can find any patterns in how people approach the theme, and click on their image for more info!</Text>

      <View>
        <Text style={[styles.text, styles.mediumText]}>Sort By:</Text>
        <View style = {styles.flexRow}>
          <Text>Age</Text>
          <Text>Birthplace</Text>
          <Text>Place of residence</Text>
        </View>
      </View>

    </View>
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
    backgroundColor: PLATINUM,
    flex: 1,
  },
  infoArea: {
    alignItems: 'center',
    padding: '5%'
  },
  text: {
    fontFamily: 'Avenir-Roman',
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
  scrollView: {
    flexGrow: 1
  },
  flexRow: {
    flexDirection: 'row'
  }
});
