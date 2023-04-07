import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Spinner from './Spinner';

export default function UploadingData() {

    return (
        <View style={styles.content}>
            <Text style={[styles.text, styles.bigText]}>Uploading...</Text>
            <Text style={[styles.text, styles.verySmallText]}>Maybe even quickly..</Text>
            <Spinner 
                size='large' 
                color='#809848'
            />
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
        flex: 1,
        backgroundColor: PLATINUM,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Avenir-Roman',
    },
    bigText: {
        fontSize: 30,
        fontWeight: 'bold',
        // padding: '5%'
    },
    verySmallText: {
        fontSize: 10,
        paddingBottom: '5%'
    },
})