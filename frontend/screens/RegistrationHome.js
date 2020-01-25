import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image
} from "react-native";

class RegistrationHome extends React.Component {
  static navigationOptions = {
    title: "The App"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.screen}>
        <View style={{ height: "20%" }}></View>
        <View style={styles.main}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10
              }}
            >
              App for doctors and users to make manage their prescriptions easy
            </Text>
            <View style={styles.content}>
              <View style={{ width: "48%", marginRight: 5 }}>
                <Button
                  title="Sign In as user"
                  onPress={() => navigate("SignIn")}
                  color="#6B52AE"
                ></Button>
              </View>
              <View
                style={{
                  width: "48%",
                  marginLeft: 5
                }}
              >
                <Button
                  title="Create Account"
                  onPress={() => navigate("SignUp")}
                  color="#6B52AE"
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  logo: {
    width: 150,
    height: 150,
    opacity: 1
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  content: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default RegistrationHome;
