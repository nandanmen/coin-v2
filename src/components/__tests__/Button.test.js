import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Button from 'components/Button';
import { withTheme } from 'utils';

afterEach(cleanup);

describe('button', () => {
  it('calls onclick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      withTheme(<Button text="Click me!" onClick={handleClick} />)
    );
    fireEvent.click(getByText('Click me!'));
    expect(handleClick).toHaveBeenCalled();
  });
});
