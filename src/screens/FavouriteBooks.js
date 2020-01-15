import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';


import Book from '../components/Book'
import * as FavouritesActions from "../store/actions/Books";
import Colors from '../constants/Colors'

const FavouriteBooks = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const myFavBooks = useSelector(state => state.Books.favBooks)
    console.log(myFavBooks.length)

    useEffect(() => {
        setIsLoading(true)
        dispatch(FavouritesActions.fetchFavourite()).then(() =>
            setIsLoading(false))
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={ styles.centered }>
                <ActivityIndicator size="large" color={ Colors.primary } />
            </View>
        );
    }

    if (myFavBooks.length === 0 && isLoading === false) {
        return (
            <View style={ styles.centered }>
                <Text>Your favourite books will appear here!</Text>
            </View>
        )
    }


    return (
        <LinearGradient colors={ ['#DDDDDD', '#ffffff'] } style={ { flex: 1 } }>
            <View style={ styles.container }>
                <FlatList
                    data={ myFavBooks }
                    keyExtractor={ item => item.isbn }
                    numColumns='2'
                    renderItem={ ({ item }) => {
                        return (
                            <Book
                                image={ item.thumbnailUrl }
                                title={ item.title }
                                toDetails={ () => props.navigation.navigate('Details', { id: item.isbn }) } />
                        )
                    } } />
            </View >
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FavouriteBooks