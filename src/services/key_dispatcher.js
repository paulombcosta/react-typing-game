export default function({key, keyCode}, keyTypedAction, spaceTypedAction) {
    if (keyCode >= 65 && keyCode <= 90) {
        keyTypedAction(key, keyCode);
    } else if (keyCode === 32) {
        spaceTypedAction();
    }
};