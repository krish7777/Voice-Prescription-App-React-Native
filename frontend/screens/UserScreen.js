import React from 'react';

import { View, Text } from 'react-native'

export default UserScreen = props => {
    const currentUser = props.navigation.getParam('currentUser')
    console.log(currentUser)
    return(
        <View>
            <Text>User Screen</Text>
        </View>
    )
}