// OneToDo.tsx

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ToDoItem } from '../../../App';
import OneToDoButton from './OneToDoButton';
import Fonts from '../../styles/fonts';
import Colors from '../../styles/colors';

interface Props {
    todoitem: ToDoItem;
    toggleCompleteToDo: (idx: string) => void;
    deleteTodo: (idx: string) => void;
}

const OneToDo: React.FC<Props> = ({todoitem, toggleCompleteToDo, deleteTodo}) => {
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoText}>{todoitem.title}</Text>
      
        <View style={styles.buttons}>
            <OneToDoButton
              name='Done'
              complete={todoitem.complete}
              onPress={() => toggleCompleteToDo(todoitem.id)} />
            <OneToDoButton
              name='Delete'
              complete={todoitem.complete}
              onPress={() => deleteTodo(todoitem.id)} />
          </View>
      </View>
   );
}

const styles = StyleSheet.create({
    todoContainer: {
      marginHorizontal: 20,
      flexDirection:'row',
      paddingVertical: 20,
      alignItems: 'center',
      width: "100%",
    },
    todoText: {
      fontSize: 17,
      fontFamily: Fonts.regular,
      color: Colors.text
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'

    }
  });

export default OneToDo;
