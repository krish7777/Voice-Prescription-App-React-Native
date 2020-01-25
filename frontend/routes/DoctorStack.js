import { createStackNavigator } from "react-navigation-stack";
import DoctorSpeak from "../screens/DoctorSpeak";
import PatientContact from "../screens/PatientContact";
import DoctorForm from "../screens/DoctorForm";
import React from "react";
import Header from "../shared/header";

const DoctorStack = createStackNavigator(
  {
    DoctorSpeak: {
      screen: DoctorSpeak,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header
              title="Voice Prescription"
              navigation={navigation}
              burger="true"
            />
          )
        };
      }
    },
    DoctorForm: {
      screen: DoctorForm,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header
              title="Doctor's Form"
              navigation={navigation}
              burger="false"
            />
          )
        };
      }
    },
    PatientContact: {
      screen: PatientContact,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Header
              title="Patient Contact"
              navigation={navigation}
              burger="false"
            />
          )
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#6B52AE",
      headerStyle: { backgroundColor: "#111", height: 60 }
    }
  }
);

export default DoctorStack;
