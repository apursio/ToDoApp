// SelectButton.tsx

import React from 'react';
import {
    GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Colors from '../../styles/colors';

interface Props {
    onPress: (event: GestureResponderEvent) => void,
    name: string,
    selected: boolean
}

const SelectButton: React.FC<Props> = ({name, onPress, selected}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableHighlight
                style={[styles.button, selected ? styles.buttonSelected : null]}
                onPress={onPress}
            >
                <Text 
                    style={styles.buttonText}>{name}
                </Text>
            </TouchableHighlight>
            
        </View>
    )
}


const styles = StyleSheet.create({
    buttonContainer:{
        flex: 1,
        alignItems: 'flex-end'
    },
    button:{
        height: "100%",
        width: '100%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.primary,
        backgroundColor: Colors.button,
   },
   buttonSelected:{
        backgroundColor: Colors.primary
   },
   buttonText:{
    fontSize: 20,
    fontWeight: '600',
}
})

export default SelectButton;