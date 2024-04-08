import type { ReactNode, ComponentType, HTMLAttributes } from 'react';

import React from 'react';

type WrapProps = {
  at?: ComponentType<HTMLAttributes<HTMLElement>>;
  show: boolean;
  children?: ReactNode;
};

export const Wrap: React.FC<WrapProps> = ({
  at: Component = 'div',
  show,
  children,
  ...rest
}) => (show ? <Component {...rest}>{children}</Component> : null);
