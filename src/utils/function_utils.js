// Credits to https://gist.github.com/renaudtertrais/fbb1a78d495bd72b8b318fb7368644e2
export const pipe = (f1, ...fns) => (...args) => {
    return fns.reduce((res, fn) => fn(res), f1.apply(null, args));
}