import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker';
import NavFooter from './NavFooter';

export default function ProfileScreen({navigation}) {
  return (
    <View>
      <Text>Profile Screen</Text>
      {/* <NavFooter navigation={navigation} /> */}
    </View>
  )
}