import { randomWords } from '../services/words_generator';
import { CHARACTER_TYPED, SPACE_TYPED } from '../actions/'

export default function(state = defaultState(), action) {
    console.log("ACTION TRIGGERED", action.type);
    switch (action.type) {
        case CHARACTER_TYPED:
            return updateCurrentTypedChars(action.payload.key, state);
        case SPACE_TYPED:
            return resetCurrentTypedChars(state);
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
    return Object.assign({}, state, { currentTypedChars: state.currentTypedChars.concat([char]) });
}

function resetCurrentTypedChars(state) {
    return Object.assign({}, state, { currentTypedChars: [] });
}