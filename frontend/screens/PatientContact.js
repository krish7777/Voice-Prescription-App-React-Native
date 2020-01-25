import React from "react";
import { StyleSheet, View, Text } from "react-native";

class PatientContact extends React.Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});

export default PatientContact;
