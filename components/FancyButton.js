import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FancyButton(props) {
    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.displayText}</Text>
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
    button: {
        backgroundColor: GREEN,
        padding: '5%',
        borderRadius: '10',
        width: 200,
        alignItems: 'center',
        margin: '5%'
    },
    text: {
        fontFamily: 'Avenir-Roman',
        fontWeight: 'bold',
        color: WHITE,
        textAlign: 'center',
        fontSize: '15'
    }
})