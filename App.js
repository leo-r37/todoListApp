import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './Redux/store';

import NewTodo from './Components/NewTodo';
import ToDoList from './Components/ToDoList';
import ToDoElement from './Components/ToDoElement';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NewTodo />
        <ToDoList />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#244C7A',
    alignItems: 'center',
  },
});
