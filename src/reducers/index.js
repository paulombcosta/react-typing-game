import { combineReducers } from 'redux';
import StateReducer from './reducer_state';

const rootReducer = combineReducers({
    appState: StateReducer
});

export default rootReducer;