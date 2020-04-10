export const format = value =>
    value ? `(${value.slice(0,2)})${value.slice(2)}` : null;