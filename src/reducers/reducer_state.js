import { randomWords } from '../services/words_generator';
import { CHARACTER_TYPED, SPACE_TYPED, TICK, RESTART } from '../actions/';
import { pipe } from '../utils/function_utils';
import { update } from '../services/word_status';
import { STARTED, NOT_STARTED, FINISHED} from '../services/application_status';

export default function(state = defaultState(), action) {
    switch (action.type) {
        case CHARACTER_TYPED:
            return pipe(
                updateCurrentTypedChars(action.payload.key),
                startApplication)(state);
        case SPACE_TYPED:
            return pipe(
                updateWordStatus,
                resetCurrentTypedChars,
                incrementPosition,
                updateAppliedDistance(action.payload),
                updateTopDistance(action.payload)) (state);
        case TICK:
            return onTick(state);
        case RESTART:
            return restartApplication();
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
        applicationStatus: NOT_STARTED,
        elapsedTime: 0
    }
};

function startApplication(state) {
    if (state.applicationStatus === NOT_STARTED) {
        return {...state, applicationStatus: STARTED};
    } else {
        return state;
    }
}

function updateCurrentTypedChars(char) {
    return (state) => {
        return {...state, currentTypedChars: [...state.currentTypedChars, char]};
    }
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
        if (currentWordTopDistance === 300 && previousWordTopDistance <= 252) {
            return {...state, appliedDistance: state.appliedDistance + 48};
        } else {
            return state;
        }
    }
}

function onTick(state) {
    const updatedElapsedTime = state.elapsedTime + 1;
    if (updatedElapsedTime === 60) {
        return {...state, elapsedTime: state.elapsedTime + 1, applicationStatus: FINISHED}
    } else if (state.applicationStatus === STARTED) {
        return { ...state, elapsedTime: state.elapsedTime + 1 };
    } else {
        return state;
    }
}

function restartApplication() {
    return defaultState();
}