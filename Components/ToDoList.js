import React, { Component, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { connect } from "react-redux";

import ToDoElement from "./ToDoElement";

import { collection, onSnapshot  } from "firebase/firestore";
import db from '../database/firebase';


const ToDoList = (props) => {

    const [todoList, setTodoList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const loadTodoList = async () => {
            const unsub = onSnapshot(collection(db, 'tasks'), (doc) => {
                const todos = [];
                doc.docs.forEach((doc) => {
                    const {title, description} = doc.data();
                    todos.push({
                        id: doc.id,
                        title,
                        description
                    })
                });
                setTodoList(todos);
                setLoading(false);
            }); 
        }
        loadTodoList();
    },[]);

    


    return (
        <ScrollView style={s.container} contentContainerStyle={s.content}>


            {
                loading ? <ActivityIndicator size="large" color="#00ff00"/> : null
            }

            {
                !loading & todoList.length === 0 ? <Text style={s.noTasks}>No hay tareas pendientes</Text> : null
            }

            {
                todoList.length > 0 && todoList.map(t => {
                    return (
                        <ToDoElement key={t.id} id={t.id} title={t.title} description={t.description} />
                    )
                })
            }


        </ScrollView>
    )
}


const s = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    noTasks: {
        color: '#fff',
        fontSize: 20,
    }
})


const mapStateToProps = (state) => {
    return {
        toDos: state.toDos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchTasksData: () => dispatch(watchTasksData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);