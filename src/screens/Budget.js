import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import BudgetPie from './budget/BudgetPie';

function Budget() {
  return (
    <Layout>
      <Heading>Your budget.</Heading>
      <BudgetPie />
    </Layout>
  );
}

export default Budget;

const Heading = styled.h1`
  font-size: 3.33em;
`;
