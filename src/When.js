const getConditionResult = (condition) => Boolean(typeof condition === 'function' ? condition() : condition);
export const When = ({ condition, children, Else = null }) => {
    const conditionResult = Boolean(getConditionResult(condition));
    if (!conditionResult && Else) {
        return Else;
    }
    return conditionResult && children ? children : null;
};
