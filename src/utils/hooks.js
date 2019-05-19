import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export function useOptions(initialIndex, options) {
  const [active, setActive] = useState(initialIndex);

  const buttons = options.map((option, index) => (
    <OptionBtn
      key={option}
      value={index}
      onClick={() => setActive(index)}
      variant={index === active ? 'active' : null}
    >
      {option}
    </OptionBtn>
  ));

  return [options[active], buttons];
}

const OptionBtn = styled.button`
  text-transform: capitalize;
  position: relative;
  margin-right: 2em;
  font-size: 1.5em;
  font-weight: 500;
  padding-bottom: 0.5em;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  outline: none;

  ${({ variant }) =>
    variant === 'active' &&
    css`
      &:after {
        content: '';
        position: absolute;
        background: ${({ theme }) => theme.colors.black};
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
      }
    `}
`;
