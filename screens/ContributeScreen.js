import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

export default function ContributeScreen({navigation}) {
  return (
    <View style={styles.page}>
      <SafeAreaView>
        <View style={styles.content}>
          <Text>Welcome</Text>
        </View>
      </SafeAreaView>
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
  page: {
    backgroundColor: PLATINUM,
    flex: 1,
  },
  content: {
    alignItems: 'center',
  }
})
