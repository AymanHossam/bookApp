import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigationActions } from "react-navigation";
import Navigation from './Navigation'

const NavigatorContainer = () => {

    const isAuth = useSelector(state => !!state.Auth.token)
    const navRef = useRef()

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
        }
    }, [isAuth])

    return <Navigation ref={ navRef } />
}

export default NavigatorContainer