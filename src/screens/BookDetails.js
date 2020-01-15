import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import * as FavouritesActions from "../store/actions/Books";
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



import Books from '../data/Books'
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler'

const BookDetails = (props) => {
    const dispatch = useDispatch()

    const selectedBook = Books.find(book => book.isbn === props.navigation.getParam('id'))
    const favouriteBooks = useSelector(state => state.Books.favBooks)

    const isFav = useSelector(state => state.Books.favBooks.some(book => book.isbn === selectedBook.isbn))
    const deletedBook = favouriteBooks.find(book => book.isbn === selectedBook.isbn)


    const addFavHandler = useCallback(() => {
        dispatch(FavouritesActions.addFavourite(selectedBook))
    }, [dispatch, selectedBook])

    const delFavHandler = useCallback(() => {

        dispatch(FavouritesActions.delFavourite(deletedBook))
    }, [dispatch, selectedBook, deletedBook])

    useEffect(() => {
        props.navigation.setParams({ addFav: addFavHandler, delFav: delFavHandler, isFav })
    }, [addFavHandler, delFavHandler, isFav])

    return (

        <ScrollView>
            <LinearGradient colors={ ['#DDDDDD', '#ffffff'] } style={ styles.gradient }>
                <View style={ styles.container }>
                    <Text style={ styles.title }>{ selectedBook.title }</Text>
                    <View style={ styles.imageContainer }>
                        <Image style={ styles.image } source={ { uri: selectedBook.thumbnailUrl } } />
                    </View>
                    <View >
                        <View style={ styles.infoContainer }>
                            <Text style={ styles.info }>Pages Count:</Text>
                            <Text style={ styles.infoData }>{ selectedBook.pageCount }</Text>
                        </View>
                        <View style={ styles.infoContainer }>
                            <Text style={ styles.info }>Published Year: </Text>
                            <Text style={ styles.infoData }>{ parseInt(selectedBook.publishedDate.$date.substr(0, 4)) }</Text>
                        </View>
                        <View style={ styles.infoContainer }>
                            <Text style={ styles.info }>Authors</Text>
                            <Text style={ styles.infoData }>{ selectedBook.authors.join(", ") }</Text>
                        </View>
                        <View style={ styles.infoContainer }>
                            <Text style={ styles.info }>Catigories:</Text>
                            <Text style={ styles.infoData }>{ selectedBook.categories.join(", ") }</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={ styles.description }>Description</Text>
                    </View>
                    <View>
                        <Text style={ styles.shortDescription }>{ selectedBook.longDescription }</Text>
                    </View>
                </View >
            </LinearGradient>
        </ScrollView>
    )
}

BookDetails.navigationOptions = ({ navigation }) => {
    const isFav = navigation.getParam('isFav')
    addFav = navigation.getParam('addFav')
    delFav = navigation.getParam('delFav')
    console.log(isFav)
    return {
        headerRight: () => <TouchableNativeFeedback style={ { marginHorizontal: 15 } } onPress={ isFav ? delFav : addFav }>
            <AntDesign
                name={ isFav ? 'star' : 'staro' }
                size={ 23 }
                color='orange'
            /></TouchableNativeFeedback>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        margin: 10,
        fontSize: 25,
        fontFamily: 'open-sans-bold',
        marginBottom: 15,
        alignSelf: 'center'
    },
    imageContainer: {
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 250,
        width: 300,
        marginBottom: 20
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    infoContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    info: {
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        marginRight: 10
    },
    infoData: {
        fontSize: 15,
        fontFamily: 'open-sans',
        marginRight: 5
    },
    description: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        alignSelf: 'center'
    },
    shortDescription: {
        marginHorizontal: 20,
        fontSize: 16,
        fontFamily: 'open-sans',
        includeFontPadding: true
    }
})

export default BookDetails