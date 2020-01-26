import React, { useEffect, useState } from 'react';

import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native'
import Axios from 'axios';

export default UserScreen = props => {

    // const currentUser = props.navigation.getParam('currentUser')
    // const prescriptions = currentUser.prescriptionsl

    // const [presc, setPrecs] = useState([])

    // useEffect(() => {
    //     Axios.post('http://10.0.2.2:8000/api/prescriptions', {userEmail: currentUser.email})
    //     .then(res => {
    //         setPrecs(prevState => [...prevState, ...res.data])
    //     })
    // }, [])

    let cards = <Text>Loading....</Text>

    // if(presc.length>0){
    //     <Text>Loaded</Text>
    // }

    return(
        {cards}
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: 'red'
    }
})