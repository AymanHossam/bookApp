import React, { useEffect } from 'react'
import { View, AsyncStorage } from 'react-native'
import { useDispatch } from "react-redux";

import * as authActions from '../store/actions/Auth';


const StartupScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const loadUser = async () => {
            const savedUser = await AsyncStorage.getItem('userData')
            if (!savedUser) {
                props.navigation.navigate('Auth')
                return
            }
            const currentUser = JSON.parse(savedUser)

            const { userId, token, expiryDate } = currentUser
            const oldExpiryDate = new Date(expiryDate)
            if (oldExpiryDate <= new Date() || !userId || !token) {
                props.navigation.navigate('Auth')
                return
            }

            const expirationTime = oldExpiryDate.getTime() - new Date().getTime()
            dispatch(authActions.authenticate(token, userId, expirationTime))
            props.navigation.navigate('Main')
        }
        loadUser()

    }, [])

    return <View />

}


export default StartupScreen