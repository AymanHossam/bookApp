import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'


const Book = (props) => {
    let TouchOpa = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchOpa = TouchableNativeFeedback
    }

    return (
        <View style={ styles.container }>
            <TouchOpa onPress={ props.toDetails }>
                <View style={ styles.imageContainer }>
                    <Image source={ { uri: props.image } } style={ styles.image } />
                </View>
            </TouchOpa>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: 140,
        marginHorizontal: 20,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default Book