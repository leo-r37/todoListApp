import { createStore, applyMiddleware, compose } from "redux";
import Reducer from './reducer';
import thunkMiddleware from 'redux-thunk'



const store = createStore(Reducer);

 export default store;