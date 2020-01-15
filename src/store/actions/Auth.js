export const SIGN = 'sign'
export const LOG_OUT = 'log_out'

import { AsyncStorage } from "react-native";



export const authenticate = (token, userId, time) => {
    return dispatch => {
        dispatch(setLogoutTimer(time))
        dispatch({ type: SIGN, token, userId })
    }
}

export const logOut = () => {
    return async dispatch => {
        clearLogoutTimer()
        AsyncStorage.removeItem('userData')
        dispatch({ type: LOG_OUT })
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-4Ge89DOfVo7NmvkksPX7tDmNT-LBQZ8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        const expiryDate = new Date(new Date().getTime + parseInt(resData.expiresIn) * 1000)
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
        saveDataToStorage(resData.localId, resData.idToken, expiryDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-4Ge89DOfVo7NmvkksPX7tDmNT-LBQZ8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        const expiryDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
        saveDataToStorage(resData.localId, resData.idToken, expiryDate)
    };
};
let timer

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut())
        }, expirationTime)
    }
}

const saveDataToStorage = (userId, token, expiryDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        userId,
        token,
        expiryDate: expiryDate.toISOString()
    }))
}



