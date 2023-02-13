import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";


// Source for this code: https://blog.logrocket.com/create-style-custom-buttons-react-native/
const AppButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 40
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});