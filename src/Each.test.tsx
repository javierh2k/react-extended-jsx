import { render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';

import { Each } from './Each'; // Ajusta la ruta de importación según sea necesario

test('renders empty when the items array is empty', () => {
  const { container } = render(
    <Each items={[]} id="test" render={() => <></>} />,
  );

  expect(container).toBeEmptyDOMElement();
});

// 2. Componente con items
test('renderiza correctamente una lista de items', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  render(
    <Each items={items} id="test">
      {(item) => <div>{item.name}</div>}
    </Each>,
  );
  items.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
  });
});

test('renderiza el contenido de Else cuando la lista de items está vacía', () => {
  render(
    <Each items={[]} id="test" Else={<div>No items found</div>}>
      {() => <></>}
    </Each>,
  );
  expect(screen.getByText('No items found')).toBeInTheDocument();
});

test('utiliza el método render para renderizar los items', () => {
  const items = [{ id: 1, name: 'Item 1' }];

  render(
    <Each
      items={items}
      id="test"
      render={(item) => <span>{item.name}</span>}
    />,
  );
  expect(screen.getByText(items[0].name).tagName).toBe('SPAN');
});

test('renderiza los items dentro del componente especificado en el prop `as`', () => {
  const items = [{ id: 1, name: 'Item 1' }];

  render(
    <Each items={items} id="test" as="ul">
      {(item) => <li>{item.name}</li>}
    </Each>,
  );
  expect(screen.getByText(items[0].name).closest('ul')).toBeInTheDocument();
});

// 6. Comprobación de errores
test('lanza un error cuando los items no son un array', () => {
  const renderWithInvalidItems = () =>
    render(<Each items={null as any} id="test" render={() => <></>} />);

  expect(renderWithInvalidItems).toThrowError();
});

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    if (renderCount < 5) {
      const timer = setTimeout(() => {
        console.log(`Renderizado ${renderCount + 1}`);
        setRenderCount(renderCount + 1);
      }, 100); 

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [renderCount]);

  return (
    <div>
      {renderCount}
      {children}
    </div>
  );
};

test('Wrap se re-renderiza cinco veces y cada re-renderizado es correcto', async () => {
  const logSpy = vi.spyOn(console, 'log');

  render(
    <Wrapper>
      <p>Contenido hijo</p>
    </Wrapper>,
  );

  await waitFor(() => expect(logSpy).toHaveBeenCalledTimes(5));

  expect(logSpy).toHaveBeenNthCalledWith(1, 'Renderizado 1');
  expect(logSpy).toHaveBeenNthCalledWith(2, 'Renderizado 2');
  expect(logSpy).toHaveBeenNthCalledWith(3, 'Renderizado 3');
  expect(logSpy).toHaveBeenNthCalledWith(4, 'Renderizado 4');
  expect(logSpy).toHaveBeenNthCalledWith(5, 'Renderizado 5');

  logSpy.mockRestore();
});

test('se memoiza correctamente cuando se proporciona el prop `cache`', async () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  const renderSpy = vi.fn();
  const logSpy = vi.spyOn(console, 'log');
  const logWarnSpy = vi.spyOn(console, 'warn');

  render(
    <Wrapper>
      <Each items={items} id="test" cache>
        {(item: {id: number, name: string}) => {
          renderSpy();
          console.warn('render each item')
          return <div>{item.name}</div>;
        }}
      </Each>
    </Wrapper>,
  );
  await waitFor(() => expect(logSpy).toHaveBeenCalledTimes(5));
  await waitFor(() => expect(logWarnSpy).toHaveBeenCalledTimes(2));

  expect(renderSpy).toHaveBeenCalledTimes(2);
});
