import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, node } from 'prop-types';

function Button({ onClick, text, icon, className }) {
  const handler = e => {
    e.preventDefault();
    onClick();
  };
  return (
    <Wrapper className={className} onClick={handler}>
      {icon}
      <Text>{text}</Text>
    </Wrapper>
  );
}

Button.propTypes = {
  onClick: func.isRequired,
  text: string.isRequired,
  icon: node,
  className: string
};

export default Button;

const Wrapper = styled.button`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.grays.dark};
    border-radius: 16px;
    color: ${theme.colors.grays.dark};
    font-weight: 600;
    padding: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `}
`;

const Text = styled.p`
  margin-left: 1em;
`;
