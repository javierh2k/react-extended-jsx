import { jsx as _jsx } from "react/jsx-runtime";
export const Wrap = ({ at: Component = 'div', show, children, ...rest }) => (show ? _jsx(Component, { ...rest, children: children }) : null);
