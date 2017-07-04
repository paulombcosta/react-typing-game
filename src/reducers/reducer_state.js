import { randomWords } from '../services/words_generator';

export default function(state = {}) {
    return {
        words: randomWords(100)
    }
}