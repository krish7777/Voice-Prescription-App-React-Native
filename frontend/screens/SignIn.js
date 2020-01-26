import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

import axios from "axios";
import DismissKeyboard from "../shared/DismissKeyboard";
import Axios from "axios";

class SignIn extends React.Component {
  state = {
    password: "",
    email: ""
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signIn = async () => {
    const { password, email } = this.state;
    axios.post('http://10.0.2.2:8000/signin', {
          email: email,
          password: password
      })
      .then(res => {
        if(!!res.data.doctorId){
          this.props.navigation.navigate('DoctorSpeak')
        }
        else{
          this.props.navigation.navigate("UserScreen");
        }
      })
      .catch(err => console.log(err))
  
    }
  render() {
    return (
      <DismissKeyboard>
        <SafeAreaView style={styles.screen}>
          <View style={styles.container}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 100, height: 100 }}
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

            <Text
              style={{ color: "#6B52AE", fontSize: 16, paddingTop: 10 }}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              Create Account
            </Text>
          </View>

          <View style={styles.button}>
            <Button title="Sign In" onPress={this.signIn} color="#6B52AE" />
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

export default SignIn;
