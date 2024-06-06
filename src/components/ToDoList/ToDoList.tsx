// ToDoList.tsx

import React from "react";
import { StyleSheet, View } from 'react-native';
import { ToDoItem } from '../../../App';
import  OneToDo  from '../OneToDo/OneToDo';

interface Props {
    todos: ToDoItem[]
    toggleCompleteToDo: (idx: string) => void;
    deleteTodo: (idx: string) => void;
}

const ToDoList: React.FC<Props> = ({todos, toggleCompleteToDo, deleteTodo}) => {
    let allToDos = todos.map((todo, i) => {
        return (
            <OneToDo
                key={todo.id}
                todoitem={todo}
                toggleCompleteToDo={toggleCompleteToDo}
                deleteTodo={deleteTodo}
            />
        )
    });
    return (
        <View style={styles.container}>{allToDos}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "100%",
        padding: 20,
    },
});

export default ToDoList;