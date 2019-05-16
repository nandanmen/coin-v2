import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { ArrowBack } from 'styled-icons/boxicons-regular';

function BackButton({ className, children }) {
  return (
    <Back to="../" className={className}>
      <ArrowBack size="1em" />
      <p>{children}</p>
    </Back>
  );
}

export default BackButton;

const Back = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
  font-size: 1.2em;
  p {
    margin-left: 1em;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
  margin-bottom: 1em;
`;
