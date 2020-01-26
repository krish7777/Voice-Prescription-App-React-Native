import React from 'react';

import { View, Text } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';

export default UserScreen = async props => {

    const card = item => {
        console.log(item)
        return(
            <Text>CARD!!!</Text>
        )
    }

    const currentUser = props.navigation.getParam('currentUser')
    const prescriptions = currentUser.prescriptionsl

    var precs = await (await Axios.post('http://10.0.2.2:8000/api/prescriptions', {userEmail: currentUser.email})).data

    return(
        <ScrollView>
            
        </ScrollView>  
    )
}