export const ADD_TODO_ELEMENT = 'ADD_TODO_ELEMENT';
export const DELETE_TASK = 'DELETE_TASK';
export const GET_TASK_LIST = 'GET_TASK_LIST';

import { collection, onSnapshot  } from "firebase/firestore";
import db from '../database/firebase';



export const addToDoElement = (payload) => {
    return {
        type: ADD_TODO_ELEMENT,
        payload
    }
}

export const deleteTask = (payload) => {
    return {
        type: DELETE_TASK,
        payload
    }
}

export const getTaskList = (tasksData) => {
    return {
        type: GET_TASK_LIST,
        payload: tasksData
    }
}

export const watchTasksData = () => {
    return function(dispatch) {
      firebase.database().ref("tasks").on("value", function(snapshot)
      { 
          var tasksData = snapshot.val();
          var actionSetTasksData = getTaskList(tasksData);
          dispatch(actionSetTasksData);
      }, function(error) { console.log(error); });
    }
  };