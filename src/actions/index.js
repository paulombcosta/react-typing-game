export const CHARACTER_TYPED = 'CHARACTER_TYPED';
export const SPACE_TYPED = 'SPACE_TYPED';

export function keyTyped(key, keyCode) {
    return {
        type: CHARACTER_TYPED,
        payload: {key: key, keyCode: keyCode}
    }
};

export function spaceTyped(lastWordBounds) {
    return {
        type: SPACE_TYPED,
        payload: lastWordBounds
    }
};