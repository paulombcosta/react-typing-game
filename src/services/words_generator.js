import words from './words_repository';
import { UNEVALUATED } from '../services/word_status';

export function randomWords(size) {
    const wordsArray = words();
    shuffle(wordsArray);
    return wordsArray.map(word => {
        return {
            text: word,
            typedText: [],
            status: UNEVALUATED
        };
    });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}