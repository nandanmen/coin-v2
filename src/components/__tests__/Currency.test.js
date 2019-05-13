import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Currency from 'components/Currency';
import { withTheme } from 'utils';

afterEach(cleanup);

describe('currency', () => {
  it('renders currency in correct format', () => {
    const { queryByText } = render(
      withTheme(<Currency amount={29.55} currency="usd" />)
    );
    expect(queryByText('$29.55')).not.toBeNull();
  });
});
