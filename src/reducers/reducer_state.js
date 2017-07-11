import { randomWords } from '../services/words_generator';
import { CHARACTER_TYPED, SPACE_TYPED } from '../actions/';
import { pipe } from '../utils/function_utils';

export default function(state = defaultState(), action) {
    console.log("ACTION TRIGGERED", action.type);
    switch (action.type) {
        case CHARACTER_TYPED:
            return updateCurrentTypedChars(action.payload.key, state);
        case SPACE_TYPED:
            return pipe(resetCurrentTypedChars, incrementPosition)(state)
        default:
            return state;
    }
};

function defaultState() {
    return {
        words: randomWords(100),
        currentPosition: 0,
        currentTypedChars: []
    }
};

function updateCurrentTypedChars(char, state) {
    return {...state, currentTypedChars: [...state.currentTypedChars, char]};
}

function resetCurrentTypedChars(state) {
    return {...state, currentTypedChars: []};
}

function incrementPosition(state) {
    return {...state, currentPosition: state.currentPosition + 1};
}