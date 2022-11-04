import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";


import Icon from 'react-native-vector-icons/FontAwesome';
const trashIco = <Icon name="trash" size={25} color="#282828" />;
const checkIco = <Icon name='check-square' size={25} color='#228b22' />;
const noCheckIco = <Icon name='square-o' size={25} color='#a9a9a9' />;

import { doc, deleteDoc } from "firebase/firestore";
import db from '../database/firebase';



function ToDoElement({title, description, id}) {

    const [status, setStatus] = useState(false);

    const toggleStatus = () => {
        setStatus(!status)
    }

    const deleteTask = async (value) => {
        await deleteDoc(doc(db, "tasks", value));
        console.log('task deleted')
    }

    return (
        <View style={status ? s.containerDone : s.container}>

            <View style={s.textContainer}>
                <Text style={status ? s.titleDone : s.title}>{title}</Text>
                <Text style={status ? s.descriptionDone : null}>{description}</Text>
            </View>

            <View style={s.buttonsContainer}>

                <TouchableOpacity style={s.button} onPress={toggleStatus}>
                    <Text>{status ? checkIco : noCheckIco}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={s.button} onPress={() => deleteTask(id)}>
                    <Text>{trashIco}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const s = StyleSheet.create({
    
    container: {
        backgroundColor: '#fff',
        width: '90%',
        maxWidth: 324,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    containerDone: {
        backgroundColor: '#D2FCD2',
        width: '90%',
        maxWidth: 324,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textContainer: {
        flex: 1,
    },
    buttonsContainer: {
        flex: 0.1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
    },
    button: {
        // width: '10%',
        flex: 0.2,
        // alignSelf: "flex-end",
        marginBottom: 10,
    },
    title: {
        // width: '80%',
        flex: 0.8,
        fontSize: 20,
        fontWeight: "bold",
    },
    titleDone: {
        flex: 0.8,
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "line-through",
        color: '#757575',
    },
    descriptionDone: {
        textDecorationLine: "line-through",
        color: '#a9a9a9',
    }
})

const mapStateToProps = (state) => {
    return {
        toDos: state.toDos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (title) => dispatch(deleteTask(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoElement);