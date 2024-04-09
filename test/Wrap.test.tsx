import { render } from '@testing-library/react';

import { Wrap } from './Wrap';

describe('Wrap', () => {
  it('should render children when show prop is true', () => {
    const { getByText } = render(
      <Wrap show={true}>
        <div>Child element</div>
      </Wrap>,
    );

    expect(getByText('Child element')).toBeInTheDocument();
  });

  it('should not render children when show prop is false', () => {
    const { queryByText } = render(
      <Wrap show={false}>
        <div>Child element</div>
      </Wrap>,
    );

    expect(queryByText('Child element')).toBeNull();
  });

  it('should render children when show prop is undefined', () => {
    const { getByText } = render(
      <Wrap show={true}>
        <div>Child element</div>
      </Wrap>,
    );

    expect(getByText('Child element')).toBeInTheDocument();
  });

  it('should render children when show prop is a boolean', () => {
    const { getByText } = render(
      <Wrap show={true}>
        <div>Child element</div>
      </Wrap>,
    );

    expect(getByText('Child element')).toBeInTheDocument();
  });

  it('should not render children when show prop is not a boolean', () => {
    const { getByText } = render(
      <Wrap show={'true' as any}>
        <div>Child element</div>
      </Wrap>,
    );

    expect(getByText('Child element')).toBeInTheDocument();
  });
});
