import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import FancyButton from '../components/FancyButton'
// import firebase from "firebase"
import { useState } from 'react'

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import Spinner from '../components/Spinner';


export default function ProfileScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //Verify that user has set email and password before logging them in.
  function setLoggedInTrue(){
    ((email != '') && (password != ''))
    ? setLoggedIn(true)
    : alert("Must enter email and password")
  }
  function setLoggedInFalse(){
    setLoggedIn(false)
  }

  const logInUser = () => {
    showLoading()
    firebase.auth().signInWithEmailAndPassword( email, password )
      .then(
        () => {
          //return user
          setLoggedIn(true)
        }
      ).catch(
        () => {
          firebase.auth().createUserWithEmailAndPassword( email, password )
          .then(
            () => {
              //new user
              setLoggedIn(true)
            }
          ).catch(
            () => {
              //bad user!!
              firebase.auth().signOut()
            }
          )
        }
      )
    hideLoading()
  }

  const showLoading = () => {
    setIsLoading(true)
  }
  const hideLoading = () => {
    setIsLoading(false)
  }

  return (
    <View style={styles.page}>
      <SafeAreaView>
        <View style={styles.content}>
          <Text style={[styles.text, styles.bigText]}>Profile Page</Text>
          <View style={styles.displayWrapper}>
          {
            !isLoading ?
                !loggedIn
                ?
                  <View style={styles.loginArea}>
                    <Text style={[styles.text, styles.mediumText]}>Log in to manage your account</Text>
                    <InputField 
                      placeholder = "Enter Your email"
                      changeValue = {email}
                      changeFunction = {setEmail}
                      secureTextEntry = {false}
                    />
                    <InputField
                      placeholder = "Enter Your Password"
                      changeValue = {password}
                      changeFunction = {setPassword}
                      secureTextEntry = {true}
                    />
                    <FancyButton
                      displayText = "Log in"
                      onPress = {logInUser}
                    />
                  </View>
                :
                  <View>
                    <Text styles={[styles.text, styles.mediumText]}>
                      You are now logged in!
                    </Text>
                    <FancyButton
                      displayText = "Log out"
                      onPress = {setLoggedInFalse}
                    />
                  </View>
            :
            <Spinner size='large' color='#809848'/>
          }
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

function InputField(props) {
  return (
    <TextInput
      secureTextEntry={props.secureTextEntry}
      style = {styles.input}
      placeholder = {props.placeholder}
      value = { props.changeValue }
      onChangeText = { newEmail => props.changeFunction(newEmail) }
    />
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
  },
  displayWrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    height: '12%',
    padding: '2%',
    margin: '2%'
  },
  loginArea: {
    width: '90%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Avenir-Roman',
    textAlign: 'center',
  },
  bigText: {
    fontSize: 30,
    // fontWeight: 'bold',
    padding: '5%'
  },
  mediumText: {
    fontSize: 20
  },
})