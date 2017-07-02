export const KEY_TYPED = 'KEY_TYPED';

export function keyTyped(key) {
    return {
        type: KEY_TYPED,
        payload: key
    }
}