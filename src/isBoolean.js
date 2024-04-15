export function isBoolean(value) {
    if (value === false) {
        return false;
    }


    if (value === true) {
        return true;
    }


    if (
        value === 0 ||
        value === '' ||
        value === null ||
        value === undefined ||
        Number.isNaN(value)
    ) {
        return false;
    }


    if (
        Array.isArray(value) &&
        (value.length === 0 ||
            value.every((item) => item === null || item === undefined))
    ) {
        return false;
    }


    if (typeof value === 'string' && value.toLowerCase() === 'false') {
        return false;
    }


    if (value === 'true' || value === 1) {
        return true;
    }


    if (typeof value === 'number' && Number(value) > 0) {
        return true;
    }


    if (
        typeof value === 'object' &&
        (Object.keys(value).filter((o) => o).length > 0 || Array.isArray(value))
    ) {
        return true;
    }


    if (typeof value === 'string' && value.length) {
        return true;
    }


    if (typeof value === 'function' && value() !== undefined) {
        return true;
    }


    if (Object.prototype.toString.call(value) === '[object Date]') {
        return false;
    }


    return !value;
}
