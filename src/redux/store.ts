import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducer from './reducers/allReducer';

export default createStore(allReducer, applyMiddleware(thunk));