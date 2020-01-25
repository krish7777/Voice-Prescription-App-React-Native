import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation, burger }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      {burger === "true" ? (
        <MaterialIcons
          name="menu"
          size={28}
          onPress={openMenu}
          style={styles.icon}
          color="#6B52AE"
        />
      ) : (
        <View></View>
      )}

      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#eee",
    letterSpacing: 1,
    position: "absolute",
    left: 0,
    marginLeft: 50
  },
  // icon: {
  //   position: "absolute",
  //   left: "500%"
  // },
  headerTitle: {
    flexDirection: "row"
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  }
});
