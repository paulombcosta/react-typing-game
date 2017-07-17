export const CHARACTER_TYPED = 'CHARACTER_TYPED';
export const SPACE_TYPED = 'SPACE_TYPED';
export const TICK = "TICK";
export const RESTART = "RESTART";

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

export function tick() {
    return {
        type: TICK,
        payload: {}
    }
};

export function restart() {
    return {
        type: RESTART,
        payload: {}
    }
};