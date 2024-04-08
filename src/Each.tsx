import type { ReactElement, ReactNode, ElementType } from 'react';

import { isValidElement, cloneElement, useMemo, memo, Fragment } from 'react';

interface BaseEachProps<T> {
  items: Array<T>;
  id: string;
  cache?: boolean;
  as?: ElementType;
  Else?: ReactNode;
}

interface WithChildren<T> {
  children: (item: T) => ReactNode;
  render?: never;
}

interface WithRender<T> {
  render: (item: T) => ReactNode;
  children?: never;
}

type EachProps<T> = BaseEachProps<T> & (WithChildren<T> | WithRender<T>);

function BaseEach<T>({
  items,
  id,
  Else,
  as: Component = Fragment,
  children,
  render,
}: EachProps<T>): ReactElement {
  if (!Array.isArray(items)) {
    throw new Error('** Please -> Each component must have an id prop');
  }

  const renderFunction = render || children;

  const content =
    items.length > 0
      ? items.map((item, index) => {
          const key = (item as any)?.id
            ? `${id}-${(item as any).id}`
            : `${id}-${index}`;

          const element = renderFunction(item);

          if (Component === Fragment) {
            return isValidElement(element)
              ? cloneElement(element, { key })
              : element;
          }

          return <Component key={key}>{element}</Component>;
        })
      : Else ?? null;

  return <>{content}</>;
}

function Memoized(props){
  const MemoizedEach = memo(BaseEach);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const content = useMemo(() => <MemoizedEach {...props} />, [props]);

  return content;
}

export function Each<T>(props: EachProps<T>) {
  if (props.cache) {
    return <Memoized {...props}/>;
  }

  return <BaseEach {...props} />;
}
