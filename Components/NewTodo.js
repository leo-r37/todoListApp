import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, StatusBar, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addToDoElement } from "../Redux/actions";

//firebase
import { collection, addDoc, onSnapshot, doc, writeBatch } from "firebase/firestore";
import db from '../database/firebase';
const batch = writeBatch(db);




//Font Awesome
import Icon from 'react-native-vector-icons/FontAwesome';
const newTaskIco = <Icon name="plus-square" size={35} color="#000B5E" />;
const clearInputIco = <Icon name="window-close" size={30} color="#404040" />;


const NewTodo = (props) => {


    const [input, setInput] = useState({
        title: '',
        description: '',
    });

    const [errors, setErrors] = useState('')


    const handleInputChange = (name, value) => {
        setInput({
            ...input,
            [name]: value,
        });
        handleErrors()
    }

    const handleErrors = () => {
        if (!input.title) {
            setErrors('Inserte un título')
        }else {
            setErrors('')
        }
    }

    const handleSubmit = async () => {
        
        
        if (errors) {
            return
        }else{
            const docRef = await addDoc(collection(db, "tasks"), {
                title: input.title,
                description: input.description,
            });
            console.log("Task written with ID: ", docRef.id);
    
            setInput({
                title: '',
                description: '',
            })
        }      
    }

    const clearInput = () => {
        setInput({
            title: '',
            description: '',
        })
    }



    return (

        <View style={s.container}>

            <StatusBar barStyle={"light-content"} backgroundColor={'#244C7A'}/>

            <Text style={s.text}>Nueva tarea</Text>

            <TextInput style={s.input} placeholder={'Título'} value={input.title} onChangeText={(value) => {handleInputChange('title', value)}}/>
            {errors ? <Text style={s.error}>{errors}</Text> : null}
            <TextInput style={s.input} placeholder={'Descripción'} value={input.description} onChangeText={(value) => {handleInputChange('description', value)}} multiline={true}/>

            <View style={s.buttonsContainer}>

                {/* <TouchableOpacity style={s.clearButtonContainer}>
                    <Text style={s.clearButton}>Limpiar completados</Text>
                </TouchableOpacity> */}
                
                <TouchableOpacity onPress={clearInput}>
                    <View>{clearInputIco}</View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit}>
                    <View>{newTaskIco}</View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 30,
        marginTop: 50,
        padding: 20,
        width: '90%',
        maxWidth: 324,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
    },
    input: {
        borderColor: '#202023',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 3,
        fontSize: 20,
        margin: 5,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    error: {
        color: 'red'
    },
    clearButtonContainer: {
        backgroundColor: '#404040',
        padding: 3,
        borderRadius: 3,
    },
    clearButton: {
        color: '#fff',
        fontWeight: 'bold',
    }
    
})

const mapStateToProps = (state) => {
    return {
        toDos: state.toDos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDoElement: (payload) => dispatch(addToDoElement(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);