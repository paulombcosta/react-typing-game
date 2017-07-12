import { randomWords } from '../services/words_generator';
import { CHARACTER_TYPED, SPACE_TYPED } from '../actions/';
import { pipe } from '../utils/function_utils';
import { update } from '../services/word_status';

export default function(state = defaultState(), action) {
    //console.log("ACTION TRIGGERED", action.type);
    switch (action.type) {
        case CHARACTER_TYPED:
            return updateCurrentTypedChars(action.payload.key, state);
        case SPACE_TYPED:
            return pipe(
                updateWordStatus,
                resetCurrentTypedChars,
                incrementPosition,
                updateAppliedDistance(action.payload),
                updateTopDistance(action.payload)) (state);
        default:
            return state;
    }
};

function defaultState() {
    return {
        words: randomWords(100),
        currentPosition: 0,
        currentTypedChars: [],
        distanceTop: 0,
        appliedDistance: 0,
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

function updateWordStatus(state) {
    let currentPosition = state.currentPosition;

    let updatedWord = Object.assign(state.words[currentPosition])
    updatedWord.status = update(updatedWord.text, state.currentTypedChars.join(""));

    let updatedWords = Object.assign(state.words, {currentPosition: updatedWord});

    return {...state, words: updatedWords};
}

function updateTopDistance(currentWordBounds) {
    return (state) => {
        return {...state, distanceTop: currentWordBounds.top}
    }
}

function updateAppliedDistance(currentWordBounds) {
    return (state) => {
        let currentWordTopDistance = currentWordBounds.top;
        let previousWordTopDistance = state.distanceTop;
        if (currentWordTopDistance === 150 && previousWordTopDistance < 150) {
            return {...state, appliedDistance: state.appliedDistance + 48};
        } else {
            return state;
        }
    }
}