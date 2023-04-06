import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const pickImage = async (setter) => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
  });
  const source = {uri: result.assets[0].uri}
  console.log(source)
  setter(source)
}; 

export default function ImageUpload( {setter, image} ) {

  return (
    <TouchableOpacity 
      style={styles.imageUploadBox}
      onPress={() => pickImage(setter)}
    >
      <Text style={[styles.text, styles.smallText]}>Press to upload an image</Text>
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
    </TouchableOpacity>
  );
}


//Make the upload box take 2/3 of the screen width and be a nice square
const WIDTH = Dimensions.get('window').width;
const BOX_SIZE = WIDTH - Math.floor(WIDTH / 3);

const styles = StyleSheet.create({
  imageUploadBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  text: {
    fontFamily: 'Avenir-Roman',
  },
  smallText: {
    fontSize: 15
  }
})