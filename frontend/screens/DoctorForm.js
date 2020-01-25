import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

class DoctorForm extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Doctor Form</Text>
        <Button title="Submit" onPress={() => navigate("PatientContact")} />
      </View>
    );
  }
}

export default DoctorForm;
