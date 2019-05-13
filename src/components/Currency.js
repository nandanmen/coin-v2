import React from 'react';
import styled from 'styled-components';

function Currency({ className, amount, currency }) {
  const [dollar, cents] = amount
    .toLocaleString('en', {
      style: 'currency',
      currency
    })
    .split('.');
  return (
    <Number className={className}>
      {dollar}
      {`.`}
      <Cents>{cents}</Cents>
    </Number>
  );
}

export default Currency;

const Number = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
`;

const Cents = styled.span`
  font-size: 0.75em;
  font-weight: 400;
`;
