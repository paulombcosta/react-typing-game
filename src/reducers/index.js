import { combineReducers } from 'redux';
import WordsReducer from './reducer_words';
import TypedWordsReducer from './reducer_typed_words';

const rootReducer = combineReducers({
    words: WordsReducer, typed_words: TypedWordsReducer
});

export default rootReducer;