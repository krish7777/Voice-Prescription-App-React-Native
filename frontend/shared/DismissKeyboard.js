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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
