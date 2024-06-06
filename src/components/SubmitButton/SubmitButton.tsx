// SubmitButton.tsx

import React from 'react';
import {
    GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

interface Props {
    submitToDo: (event: GestureResponderEvent) => void,
}

const SubmitButton: React.FC<Props> = ({submitToDo}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableHighlight
                style={styles.button}
                onPress={submitToDo}
            >
                <Text style={styles.buttonText}>
                    Add Item
                </Text>
            </TouchableHighlight>
            
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        width: '90%'
    },
    button:{
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.text,
        backgroundColor: Colors.button,
   },
   buttonText:{
    fontFamily: Fonts.regular,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text
}
})

export default SubmitButton;