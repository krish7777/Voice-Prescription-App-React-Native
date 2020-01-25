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

class SignUp extends React.Component {
  state = {
    displayName: "",
    password: "",
    email: "",
    doctorId: ""
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const { displayName, password, email, doctorId } = this.state;
    // try {
    //   fetch("https://sih-404.herokuapp.com/signup", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       displayName: displayName,

    //       email: email,
    //       password: password,
    //       doctorId: doctorId
    //     })
    //   }).then(res => console.log(res));
    this.props.navigation.navigate("DoctorSpeak");
    //   console.log("user successfully signed up!: ");
    // } catch (err) {
    //   console.log("error signing up: ", err);
    // }
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
            <Text style={{ color: "white" }}>
              Normal Users Do not Enter Doctor ID
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
