import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { string, node, oneOfType, arrayOf } from 'prop-types';

function BlockLink({ to, icon, children, className }) {
  return (
    <Container className={className} to={to}>
      {children}
      {icon}
    </Container>
  );
}

export default BlockLink;

BlockLink.propTypes = {
  to: string.isRequired,
  children: oneOfType([arrayOf(node), node]),
  icon: node,
  className: string
};

const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
