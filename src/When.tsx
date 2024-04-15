import type { ReactNode } from 'react';
import { isBoolean } from './isBoolean';

type WhenProps = {
  condition: any;
  children?: ReactNode;
  Else?: ReactNode | null;
};

export const When = ({ condition, children, Else = null }: WhenProps) => {
  const conditionResult = isBoolean(condition);

  if (!conditionResult && Else) {
    return Else;
  }

  return conditionResult && children ? children : null;
};
