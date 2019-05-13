import React from 'react';
import styled from 'styled-components';
import { render, cleanup } from 'react-testing-library';
import ProgressBar from 'components/ProgressBar';

afterEach(cleanup);

describe('progress bar', () => {
  test('ratio of progress width should match given percentage', () => {
    const percentage = 64;
    const TestBar = styled(ProgressBar)`
      width: 100px;
    `;

    const { getByTestId } = render(<TestBar percentage={percentage} />);
    const { width: containerWidth } = getByTestId(
      'container'
    ).getBoundingClientRect();
    const { width: progressWidth } = getByTestId(
      'progress'
    ).getBoundingClientRect();

    expect(containerWidth * (percentage / 100)).toEqual(progressWidth);
  });
});
