// OneToDoButton.tsx

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

interface Props {
    onPress: () => void,
    complete: boolean,
    name: string,
}

const OneToDoButton: React.FC<Props> = ({name, complete, onPress}) => {
        // Define the styles based on the condition
        let buttonStyle: ViewStyle | ViewStyle[] = styles.button;
        if (name === 'Done' && complete) {
            buttonStyle = [styles.button, styles.completeButton];
        } else if (name === 'Delete') {
            buttonStyle = [styles.button, styles.deleteButton];
        }
    return (
        <View style={styles.buttonContainer}>
            <TouchableHighlight
                style={buttonStyle}
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    button:{
        padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.text,
        marginRight: 5,
   },
   buttonText:{
    fontFamily: Fonts.italic,
    color: Colors.text,
    },
    completeButton:{
        backgroundColor: Colors.button
    },

    deleteButton:{
        backgroundColor: Colors.header,
    }
})

export default OneToDoButton;