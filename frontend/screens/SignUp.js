import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import DismissKeyboard from "../shared/DismissKeyboard";
import Axios from "axios";

class SignUp extends React.Component {
  state = {
    displayName: "",
    password: "",
    email: "",
    doctorId: "",
    hospital: ""
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const { displayName, password, email, doctorId, hospital } = this.state;

    Axios.post('https://hack-404-sih.herokuapp.com/signup', {
      displayName,
      password,
      email,
      doctorId,
      hospital
    })
    .then(res => {
        if(!!res.data.doctorId){
          this.props.navigation.navigate('DoctorSpeak')
        }
        else{
          this.props.navigation.navigate("UserScreen", {currentUser: res.data});
        }
      })
      .catch(err => console.log(err))
  };
  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={{ ...styles.screen }}>
          <View style={styles.container}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 100 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("displayName", val)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("email", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("password", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Doctor ID"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("doctorId", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Hospital"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText("hospital", val)}
            />
            <Text style={{ color: "white" }}>
              Normal Users Do not Enter Doctor ID and Hospital
            </Text>

            <Text
              style={{ color: "#6B52AE", fontSize: 16, paddingTop: 10 }}
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              Log In Instead
            </Text>
          </View>

          <View style={styles.button}>
            <Button title="Sign Up" onPress={this.signUp} color="#6B52AE" />
          </View>
        </SafeAreaView>
      </DismissKeyboard>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between"
  },
  container: {
    margin: 30
  },
  input: {
    width: "100%",
    borderBottomColor: "#6B52AE",
    borderBottomWidth: 0.5,
    fontSize: 18,
    marginVertical: "5%",
    color: "white"
  },
  button: {
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10
  }
});

export default SignUp;
