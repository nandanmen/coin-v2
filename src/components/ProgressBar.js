import React from 'react';
import styled from 'styled-components';
import { number, string } from 'prop-types';

import { themeGet } from 'theme';

function ProgressBar({ percentage, color, className }) {
  return (
    <Container data-testid="container" className={className} bg="grays.med">
      <Progress data-testid="progress" percentage={percentage} bg={color} />
    </Container>
  );
}

ProgressBar.propTypes = {
  percentage: number.isRequired,
  color: string,
  className: string
};

export default ProgressBar;

const Container = styled.div`
  background: ${({ bg }) => bg && themeGet(`colors.${bg}`, bg)};
  position: relative;
  height: 0.5em;
`;

const Progress = styled.div`
  background: ${({ bg }) => bg && themeGet(`colors.${bg}`, bg)};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(${({ percentage }) => percentage / 100});
  transform-origin: left;
`;
