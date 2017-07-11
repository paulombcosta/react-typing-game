export default function({key, keyCode}, keyTypedAction, position, spaceTypedAction) {
    if (keyCode >= 65 && keyCode <= 90) {
        keyTypedAction(key, keyCode);
    } else if (keyCode === 32) {
        spaceTypedAction(getBoundsForWord(position));
    }
};

function getBoundsForWord(position) {
    return document.getElementById(`word-${position}`).getBoundingClientRect();
}