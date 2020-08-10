import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import {Platform} from 'react-native';

import Colors from '../constants/Colors';

const CustomHeaderButton = (props) => {
    return (
        // Must forward all props, or it will not work, with {...props}
        // IconComponent expects a vector icon package which can be used for rendering icons
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
        />
    );
};

export default CustomHeaderButton;
