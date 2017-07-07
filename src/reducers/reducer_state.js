import { randomWords } from '../services/words_generator';
import { CHARACTER_TYPED, SPACE_TYPED } from '../actions/'

export default function(state = defaultState(), action) {
    switch (action.type) {
        case CHARACTER_TYPED:
            console.log(action);
            return state;
        case SPACE_TYPED:
            console.log("SPACE TYPED");
            return state;
        default:
            return state;
    }
};

function defaultState() {
    return {
        words: randomWords(100),
        currentPosition: 0
    }
};