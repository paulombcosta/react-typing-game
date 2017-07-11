export const TYPED_CORRECTLY = "TYPED_CORRECTLY";
export const TYPED_INCORRECTLY = "TYPED_INCORRECTLY";
export const UNEVALUATED = "UNEVALUATED";

export function update(original, typed) {
    if (original === typed) {
        return TYPED_CORRECTLY;
    } else {
        return TYPED_INCORRECTLY;
    }
}