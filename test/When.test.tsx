import { render } from '@testing-library/react';

import { When } from '../src/When';
import React from 'react';

describe('When', () => {
  it('should render children when condition is true', () => {
    const { getByText } = render(
      <When condition={true}>
        <div>Condition is true</div>
      </When>,
    );

    expect(getByText('Condition is true')).toBeInTheDocument();
  });

  it('should not render children when condition is false', () => {
    const { queryByText } = render(
      <When condition={false}>
        <div>Condition is true</div>
      </When>,
    );

    expect(queryByText('Condition is true')).toBeNull();
  });

  it('should render Else when condition is false', () => {
    const { getByText } = render(
      <When condition={false} Else={<div>Condition is false</div>}>
        <div>Condition is true</div>
      </When>,
    );

    expect(getByText('Condition is false')).toBeInTheDocument();
  });

  it('should render children when condition function returns true', () => {
    const { getByText } = render(
      <When condition={() => true}>
        <div>Condition is true</div>
      </When>,
    );

    expect(getByText('Condition is true')).toBeInTheDocument();
  });

  it('should render children when condition function returns false', () => {
    const { queryByText } = render(
      <When condition={undefined}>
        <div>Condition is empty</div>
      </When>,
    );

    expect(queryByText('Condition is empty')).toBeNull();
  });


  it('should not render children when condition function returns false', () => {
    const { queryByText } = render(
      <When condition={() => false}>
        <div>Condition is true</div>
      </When>,
    );

    expect(queryByText('Condition is true')).toBeNull();
  });

  it('should render Else when condition function returns false', () => {
    const { getByText } = render(
      <When condition={() => false} Else={<div>Condition is false</div>}>
        <div>Condition is true</div>
      </When>,
    );

    expect(getByText('Condition is false')).toBeInTheDocument();
  });
});
