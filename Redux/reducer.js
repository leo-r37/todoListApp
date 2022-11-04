import { ADD_TODO_ELEMENT, DELETE_TASK, GET_TASK_LIST } from "./actions";


const initialState = {
    toDos: [],
};


export default function Reducer (state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_ELEMENT: 
            return {
                toDos: [...state.toDos, action.payload]
            }
        case DELETE_TASK:
            return {
                ...state,
                toDos: state.toDos.filter(t => t.title !== action.payload)
              }
        case GET_TASK_LIST:
            return {
                ...state,
                toDos: action.payload.docs
            }
        default: 
            return state
    }
}