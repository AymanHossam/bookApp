import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, Button, Picker, TextInput } from 'react-native'
import Book from '../components/Book'
import { useSelector, useDispatch } from 'react-redux'
import MainMenu from '../components/Menu'
import * as authActions from '../store/actions/Auth';
import { LinearGradient } from 'expo-linear-gradient';



const BookOverview = (props) => {

    const dispatch = useDispatch()

    const logOutHandler = useCallback(() => {
        dispatch(authActions.logOut())
        props.navigation.navigate('Auth')
    }, [dispatch])

    useEffect(() => {
        props.navigation.setParams({ logout: logOutHandler })
    }, [logOutHandler])

    const books = useSelector(state => state.Books.books)

    const [searchTxt, setSearchTxt] = useState('')
    const [bookData, setBookData] = useState(books)
    const [category, setCategory] = useState('All')

    const favList = useSelector(state => state.Books.favBooks)

    let categories = ['All', 'Java', 'Software Engineering', 'Mobile', 'Open Source', 'Internet', 'Web Development', 'Miscellaneous', "Microsoft .NET", "Perl", "Client-Server", "Mobile Technology", "Algorithmic Art"]

    useEffect(() => {
        const categoryHandler = () => {

            const filterd = books.filter(book => {
                let lower = book.title.toLowerCase()
                let found = false
                for (let data of book.categories) {
                    if (data === category || category === "All") {
                        found = found || true
                    }
                }
                if (searchTxt) {
                    try {
                        return found && lower.search(searchTxt.toLowerCase()) >= 0
                    } catch (error) {
                        console.log(error.message)
                    }

                } else {
                    return found
                }
            })
            setBookData(filterd)
        }
        categoryHandler()
    }, [category])

    const onChangeTextHandler = (txt) => {
        setSearchTxt(txt)

        const filterd = books.filter(book => {
            let found = false
            for (let data of book.categories) {
                if (data === category || category === "All") {
                    found = found || true
                }
            }
            return found
        })

        const searchedData = filterd.filter(book => {
            let lower = book.title.toLowerCase()
            try {
                return lower.search(txt.toLowerCase()) >= 0
            } catch (error) {
                console.log(error.message)
            }

        })

        if (!txt) {
            setBookData(filterd)
            console.log(filterd.length)
        } else {
            setBookData(searchedData)
        }
    }
    return (
        <LinearGradient colors={ ['#DDDDDD', '#ffffff'] } style={ styles.container }>
            <View style={ styles.container }>
                <View style={ styles.search }>
                    <TextInput style={ styles.input } value={ searchTxt } onChangeText={ onChangeTextHandler } placeholder='Search..' />
                </View>
                <View style={ styles.filter }>
                    <Text style={ styles.category }>Category: </Text>
                    <Picker selectedValue={ category }
                        style={ styles.picker }
                        onValueChange={ (itemValue) => setCategory(itemValue) }
                        mode="dropdown">
                        { categories.map(cat => {
                            return <Picker.Item key={ cat } label={ cat } value={ cat } />
                        }) }

                    </Picker>
                </View>
                <FlatList
                    data={ bookData }
                    numColumns='2'
                    keyExtractor={ book => book.isbn }
                    renderItem={ ({ item }) => {
                        let isFav = favList.some(book => book.isbn === item.isbn)
                        return (
                            <Book
                                image={ item.thumbnailUrl }
                                title={ item.title }
                                toDetails={ () =>
                                    props.navigation.navigate('Details', { id: item.isbn, isFav }) } />
                        )
                    } }>

                </FlatList>
            </View >
        </LinearGradient>
    )
}
BookOverview.navigationOptions = (props) => {
    const logOutHandler = props.navigation.getParam('logout')

    return {
        headerTitle: 'Books',
        headerRight: () => {
            return <MainMenu onLogout={ logOutHandler } />
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        width: 350,
    },
    filter: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginHorizontal: 20
    },
    category: {
        fontSize: 17,
        fontFamily: 'open-sans-bold'
    },
    picker: {
        height: 50,
        width: 220
    },
    input: {

        paddingHorizontal: 10
    }
})

export default BookOverview