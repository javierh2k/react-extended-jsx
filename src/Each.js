import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { isValidElement, cloneElement, useMemo, memo, Fragment } from 'react';
function BaseEach({ items, id, Else, as: Component = Fragment, children, render, }) {
    if (!Array.isArray(items)) {
        throw new Error('** Please -> Each component must have an id prop');
    }
    const renderFunction = render || children;
    const content = items.length > 0
        ? items.map((item, index) => {
            const key = item?.id
                ? `${id}-${item.id}`
                : `${id}-${index}`;
            const element = renderFunction(item);
            if (Component === Fragment) {
                return isValidElement(element)
                    ? cloneElement(element, { key })
                    : element;
            }
            return _jsx(Component, { children: element }, key);
        })
        : Else ?? null;
    return _jsx(_Fragment, { children: content });
}
function Memoized(props) {
    const MemoizedEach = memo(BaseEach);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const content = useMemo(() => _jsx(MemoizedEach, { ...props }), [props]);
    return content;
}
export function Each(props) {
    if (props.cache) {
        return _jsx(Memoized, { ...props });
    }
    return _jsx(BaseEach, { ...props });
}
