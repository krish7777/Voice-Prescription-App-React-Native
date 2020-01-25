import { createStackNavigator } from "react-navigation-stack";

import DoctorProfile from "../screens/DoctorProfile";
import React from "react";
import Header from "../shared/header";

const DoctorProfileStack = createStackNavigator(
  {
    DoctorProfile: {
      screen: DoctorProfile,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header title="Profile" navigation={navigation} burger="true" />
          )
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "##6B52AE",
      headerStyle: { backgroundColor: "#111", height: 60 }
    }
  }
);

export default DoctorProfileStack;
