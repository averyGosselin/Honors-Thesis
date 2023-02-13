import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, Button} from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker';
import ExploreScreen from './ExploreScreen';
import ContributeScreen from './ContributeScreen';
import ProfileScreen from './ProfileScreen'
import AppButton from './AppButton'

export default function NavFooter({navigation}) {
  return (
    <View>
      <AppButton
        title="Explore"
        onPress={navigation.navigate('Explore')}
      />
      <AppButton
        onPress={navigation.navigate('Contribute')}
        title="Contribute"
      />
      <AppButton
        onPress={navigation.navigate('Profile')}
        title="Profile"
      />
     </View>
  )
}