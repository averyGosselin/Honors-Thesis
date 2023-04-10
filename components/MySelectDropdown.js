import * as React from 'react';
import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MySelectDropdown(props) {
    return (
        <SelectDropdown
            data={props.options}
            defaultButtonText={props.defaultText}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            rowStyle={styles.dropdown1RowStyle}
            dropdownIconPosition = {"right"}
    
            renderDropdownIcon = {isOpened => {
            return (
                <Ionicons name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'} size={'30px'} color={'grey'} />
            )
            }}
            onSelect={(selectedItem, index) => {
            props.onSelect(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
            }}
            rowTextForSelection={(item, index) => {
            return item
            }}
        ></SelectDropdown>
    )
}
  

//Theme constants
const WHITE = '#FCFAFA'
const PLATINUM = '#CED8DF'
const BLACK = '#000000'
const GREEN = '#809848'
const BLUE = '#2274A5'

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '75%',
        height: 50,
        backgroundColor: PLATINUM,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "black"
      },
      dropdown1BtnTxtStyle: {
        color: BLACK,
        fontSize: 15, 
        textAlign: 'left',
        fontFamily: 'Avenir-Roman',
      },
      dropdown1RowStyle: {
        backgroundColor: WHITE, 
        borderBottomColor: PLATINUM,
      }
})