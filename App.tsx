/**
 * ToDo React Native App
 */

import React, { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import Header from './src/components/Header/Header.tsx'
import Input from './src/components/Input/input.tsx';
import SubmitButton from './src/components/SubmitButton/SubmitButton.tsx';
import ToDoList from './src/components/ToDoList/ToDoList.tsx';
import SelectButton from './src/components/Select/SelectButton.tsx';
import Colors from './src/styles/colors.js';

export type ToDoItem = {
  title: string,
  id: any,
  complete: boolean,
}

const testToDoItems: ToDoItem[] = [
  {
    title: 'Do the dishes',
    id: uuid.v4(),
    complete: false
  },
  {
    title: 'Empty the bin',
    id: uuid.v4(),
    complete: false
  }
]

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState<string>();
  const [todos, setTodos] = useState<ToDoItem[]>(testToDoItems);
  const [filter, setFilter] = useState<string>('All');
  const [filtered, setFiltered] = useState<ToDoItem[]>(todos);
  const [selectedButton, setSelectedButton] = useState<string>("All");

  // Get todos
  useEffect(() => {
    getTodoList();
  },[]);

  // Function to filter todos based on selection
  const filterTodos = (name: string) =>  {
    setFilter(name);
    setSelectedButton(name);
  }

  // Apply filter to todos
  useEffect(() => {
    if (filter === 'All') {
      setFiltered(todos);
    } else if (filter === 'Active') {
      const filteredTodos = todos.filter(todo => !todo.complete);
      setFiltered(filteredTodos);
    } else if (filter === 'Completed') {
      const filteredTodos = todos.filter(todo => todo.complete);
      setFiltered(filteredTodos);
    }
  }, [todos, filter]);

  const inputValueChanged = (inputValue: string) => {
    setInputValue(inputValue);
  }

  const submitToDo = (event: GestureResponderEvent) => {
    if(!inputValue || inputValue.match(/^\s*$/)){
      return
    }

    const toDoItem: ToDoItem = {
      title: inputValue,
      id: uuid.v4(),
      complete: false
    }
    const newTodos = [...todos, toDoItem];
    setTodos(newTodos);

    if(filter === "All" || filter === "Active") {
      setFiltered(newTodos)
    } else if (filter === "Completed") {
      const filteredCompleted = newTodos.filter(todo => todo.complete);
      setFiltered(filteredCompleted);
    }

    setInputValue(''),
    console.log(`submitToDo ${JSON.stringify(newTodos)}`);
    saveTodoList(newTodos);
  }
  
  const toggleCompleteToDo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
      // Update the filtered todos state based on the current filter
    if (filter === 'All') {
      setFiltered(updatedTodos);
    } else if (filter === 'Active') {
      const filteredActive = updatedTodos.filter(todo => !todo.complete);
      setFiltered(filteredActive);
    } else if (filter === 'Completed') {
      const filteredCompleted = updatedTodos.filter(todo => todo.complete);
      setFiltered(filteredCompleted);
    }
    // Save updated todo list to AsyncStorage
    saveTodoList(updatedTodos);
  }

  const deleteToDo = (id: string) => {
    const updatedTodos = filtered.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    // Save updated todo list to AsyncStorage
    saveTodoList(updatedTodos);
  }
    
  const saveTodoList = async (todos: ToDoItem[]) => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(todos));
      console.log('Todo list saved successfully');
    } catch (error) {
      console.error('Error saving todo list:', error);
    }
  };

  const getTodoList = async () => {
    try {
      const todoListJson = await AsyncStorage.getItem('todoList');
      if (todoListJson !== null) {
        const todos = JSON.parse(todoListJson);
        console.log('Todo list retrieved successfully:', todos);
        setTodos(todos);
      } else {
        console.log('No todo list found');
      }
    } catch (error) {
      console.error('Error retrieving todo list:', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={Colors.primary}
      />

      <View style={styles.headerContainer}>
        <Header title = "my todos"></Header>
      </View>

      <View style={styles.viewContainer}>
         
        <Input
          inputValue={inputValue ?? ''}
          inputValueChange={inputValueChanged}
          placeholderText='What needs to be done?'
          >
        </Input>
          
        <SubmitButton submitToDo={submitToDo}></SubmitButton>
      </View> 
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
            <ToDoList
              todos={filtered}
              toggleCompleteToDo={toggleCompleteToDo}
              deleteTodo={deleteToDo}
              >
          </ToDoList>
        </ScrollView>
      </View>
      <View style={styles.selectorContainer}>
        <View style={styles.buttons}>
            <SelectButton
              name='All'
              onPress={() => filterTodos("All")}
              selected={selectedButton === "All"} />
            <SelectButton
              name='Active'
              onPress={() => filterTodos("Active")}
              selected={selectedButton === "Active"} />
            <SelectButton
              name='Completed'
              onPress={() => filterTodos("Completed")}
              selected={selectedButton === "Completed"} />
          </View>
    </View>
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary
  },
  barStyle: {
    backgroundColor: Colors.primary
  },
  headerContainer: {
    flex: 2
  },
  viewContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  scrollViewContainer: {
    flex: 6,
    backgroundColor: Colors.secondary,
    width: '100%'
  },
  selectorContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-evenly'
  }
});

export default App;
