import { createStackNavigator } from "react-navigation-stack";

import UserScreen from '../screens/UserScreen'

import React from 'react';

import Header from '../shared/header'

const UserStack = createStackNavigator({
    UserScreen: {
        screen: UserScreen,
        navigationOptions: ({ navigation }) => {
            return {
              headerTitle: () => (
                <Header
                  title="History"
                  navigation={navigation}
                  burger="true"
                />
              )
            };
          }
    },
},{
    defaultNavigationOptions: {
      headerTintColor: "#6B52AE",
      headerStyle: { backgroundColor: "#111", height: 60 }
    }
  })

import { createDrawerNavigator } from 'react-navigation-drawer'

const UserDrawer = createDrawerNavigator({
    UserStack: {
        screen: UserStack
    }
})

export default UserDrawer