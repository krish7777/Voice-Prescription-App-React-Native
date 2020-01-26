import { createStackNavigator } from "react-navigation-stack";

import UserScreen from '../screens/UserScreen'

const UserStack = createStackNavigator({
    UserScreen: {
        screen: UserScreen
    }
})

import { createDrawerNavigator } from 'react-navigation-drawer'

const UserDrawer = createDrawerNavigator({
    UserStack: {
        screen: UserStack
    }
})

export default UserDrawer