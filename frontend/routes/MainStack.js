import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DoctorDrawer from "./DoctorDrawer";
import RegistrationStack from "./RegistrationStack";
import React from "react";

// import { StackActions, NavigationActions } from "react-navigation";
// const resetAction = StackActions.reset({
//   index: 0,
//   key: null,
//   actions: [NavigationActions.navigate({ routeName: "Main" })]
// });
// this.props.navigation.dispatch(resetAction);

const Mainroot = createStackNavigator(
  {
    Register: { screen: RegistrationStack },
    Doctor: { screen: DoctorDrawer }
  },
  {
    headerMode: "none"
  }
);
const MainStack = createAppContainer(Mainroot);

export default MainStack;
