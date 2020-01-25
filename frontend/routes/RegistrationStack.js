import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import React from "react";
import RegistrationHome from "../screens/RegistrationHome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const RegistrationStack = createStackNavigator(
  {
    RegistrationHome: {
      screen: RegistrationHome
    },
    SignIn: {
      screen: SignIn
    },

    SignUp: {
      screen: SignUp
    }
  },
  {
    headerMode: "none"
  }
);

export default RegistrationStack;
