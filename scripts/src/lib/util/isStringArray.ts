export default (value: unknown): value is string[] => {
    const isArray = Array.isArray(value);

    if (!isArray) return false;

    return value.every(element => typeof element === "string");
}