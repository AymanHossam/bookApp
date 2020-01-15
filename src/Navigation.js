import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import BookOverview from "./screens/BooksOverview";
import BookDetails from "./screens/BookDetails";
import FavouriteBooks from "./screens/FavouriteBooks";
import Colors from "./constants/Colors";
import AuthScreen from './screens/AuthScreen';
import StartupScreen from './screens/StartupScreen';

const defNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
}

const booksNavigator = createStackNavigator({
    OverView: BookOverview,
    Details: BookDetails
}, {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
        tabBarIcon: tabConfig => (
            <FontAwesome
                name={ Platform.OS === 'android' ? 'book' : 'ios-cart' }
                size={ 23 }
                color={ tabConfig.tintColor }
            />
        ),
        title: 'Books'
    }
})

const favStackNavigator = createStackNavigator({
    Favourites: FavouriteBooks,
    Details: BookDetails
}, {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
        tabBarIcon: tabConfig => (
            <AntDesign
                name={ Platform.OS === 'android' ? 'star' : 'ios-cart' }
                size={ 23 }
                color={ tabConfig.tintColor }
            />
        ),
        title: 'My favourite',

    }
})

const mainNavigator = createBottomTabNavigator({
    BooksNav: booksNavigator,
    favStack: favStackNavigator

}, {
    tabBarOptions: {
        inactiveBackgroundColor: Colors.primary,
        activeBackgroundColor: '#177193',
        activeTintColor: 'black',
        labelStyle: {
            fontFamily: 'open-sans'
        }
    },
    lazy: false
})

const authNavigator = createSwitchNavigator({
    Start: StartupScreen,
    Auth: AuthScreen,
    Main: mainNavigator
})


export default createAppContainer(authNavigator)