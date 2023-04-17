import * as React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Spinner from '../components/Spinner';
import ImageScreen from './ImageScreen';
import Grid from '../components/Grid';

// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import firebase from "firebase/compat/app"
// import "firebase/compat/database"
import ExploreScreen from './ExploreScreen';

const Stack = createNativeStackNavigator();

export default function ThemeSelectScreen() {

    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="Select a Themee" component={StartScreen}/>
            <Stack.Screen name="ExploreScreen" component={ExploreScreen}/>
        </Stack.Navigator>
    )
}

const StartScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.bigText]}>Welcome</Text>
    
                    <Text style={[styles.text, styles.smallText, styles.titleSubheading]}>Please select a theme below to enter its gallery and start exploring new perspectives.</Text>

                    <View style={styles.themeGrid}>
                        <ThemeCard 
                            themeName={"Nature"}
                            navigation={navigation}
                            imgUrl={"../assets/snack-icon.png"}
                            active={true}
                        />
                        <ThemeCard themeName={"Test Card"} navigation={navigation} imgUrl={"nah"} active={false}/>
                        <ThemeCard themeName={"Test Card"} navigation={navigation} imgUrl={"nah"} active={false}/>
                        <ThemeCard themeName={"Test Card"} navigation={navigation} imgUrl={"nah"} active={false}/>
                        <ThemeCard themeName={"Test Card"} navigation={navigation} imgUrl={"nah"} active={false}/>
                        <ThemeCard themeName={"Test Card"} navigation={navigation} imgUrl={"nah"} active={false}/>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const ThemeCard = ({themeName, navigation, imgUrl, active}) => {
    const [isLoading, setIsLoading] = useState(true)
    const hideLoading = () => {
        setIsLoading(false)
    }

    if (active) {
        return (
            <TouchableOpacity
            style={styles.themeCard}
            onPress={() => navigation.navigate('ExploreScreen')}
            >
                <ImageBackground source={require('../assets/mountain.jpg')}>
                    <View style={styles.imageArea}>
                        {/* <Spinner size='large' color='#809848' animating={isLoading}/> */}
                    </View>
                </ImageBackground>
                <View style={styles.themeTextArea}>
                    <Text style={[styles.text, styles.mediumText]}>{themeName}</Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
            style={[styles.themeCard, styles.inactiveThemeCard]}
            onPress={deactivated}
            >
                <ImageBackground source={require('../assets/icon.png')}>
                    <View style={styles.imageArea}> 
                    {/* <Spinner size='large' color='#809848' animating={isLoading}/> */}
                    </View>
                </ImageBackground>
                <View style={styles.themeTextArea}>
                    <Text style={[styles.text, styles.mediumText]}>{themeName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

function deactivated() {
    alert("This is a test card, and is deactivated.")
}


const BOX_WIDTH = Math.floor((Dimensions.get('window').width) / 2.75);
const BOX_HEIGHT = Math.floor((BOX_WIDTH * 1.25));

//Theme constants
const WHITE = '#FCFAFA'
const PLATINUM = '#CED8DF'
const BLACK = '#000000'
const GREEN = '#809848'
const BLUE = '#2274A5'

const styles = StyleSheet.create({
  page: {
    backgroundColor: PLATINUM,
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Avenir-Roman',
  },
  bigText: {
    fontSize: 30,
    padding: '5%'
  },
  mediumText: {
    fontSize: 20
  },
  smallText: {
    fontSize: 15,
  },
  titleSubheading: {
    width: '90%',
    textAlign: 'center'
  },
  themeGrid: {
    width: '85%',
    height: '75%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  themeCard: {
    backgroundColor: WHITE,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageArea: {
    height: '75%',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  themeTextArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '25%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

})