import React, { useState } from 'react';

import { Text, View, Button, TouchableNativeFeedback } from 'react-native';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu"
import { Ionicons } from '@expo/vector-icons';



const MainMenu = (props) => {
    let textRef = React.createRef();
    let menuRef = null;

    const setMenuRef = ref => menuRef = ref;
    const hideMenu = () => menuRef.hide();
    const showMenu = () => menuRef.show(textRef.current, Position.BOTTOM_RIGHT);

    const onPress = () => showMenu();

    return (
        <View style={ { marginRight: 15 } }>
            <Text style={ { position: 'absolute' } }
                ref={ textRef }

            >

            </Text>


            <TouchableNativeFeedback onPress={ onPress } >
                <Ionicons
                    name={ 'md-menu' }
                    size={ 23 }
                    color='orange'
                /></TouchableNativeFeedback>

            <Menu
                ref={ setMenuRef }
            >
                <MenuItem onPress={ props.onLogout }>Log out</MenuItem>

            </Menu>

        </View>
    );
}

export default MainMenu
