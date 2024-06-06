// Header.tsx

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        marginTop: 32,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    headerText:{
        fontFamily: Fonts.bold,
        fontSize: 40,
        color: Colors.header,
        fontWeight: '600'
    }
})

export default Header;