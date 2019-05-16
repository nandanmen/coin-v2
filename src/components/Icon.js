import React from 'react';
import styled from 'styled-components';
import { Restaurant, Cart } from 'styled-icons/boxicons-regular';

function getIcon(variant, size) {
  switch (variant) {
    case 'food':
      return <Restaurant size={size} />;
    case 'groceries':
      return <Cart size={size} />;
    default:
      return variant;
  }
}

function Icon({ variant, size, className }) {
  return <Container className={className}>{getIcon(variant, size)}</Container>;
}

export default Icon;

const Container = styled.div`
  width: 2em;
  height: 2em;
`;
