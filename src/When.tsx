import type { ReactNode } from 'react';

type WhenProps = {
  condition: boolean | (() => boolean);
  children?: ReactNode;
  Else?: ReactNode | null;
};

const getConditionResult = (condition: WhenProps['condition']) =>
  Boolean(typeof condition === 'function' ? condition() : condition);

export const When = ({ condition, children, Else = null }: WhenProps) => {
  const conditionResult = Boolean(getConditionResult(condition));

  if (!conditionResult && Else) {
    return Else;
  }

  return conditionResult && children ? children : null;
};
