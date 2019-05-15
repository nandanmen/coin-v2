import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import Button from 'components/Button';
import { getBreakpoint } from 'theme';

import BudgetPie from './budget/BudgetPie';
import BudgetList from './budget/BudgetList';

function Budget() {
  return (
    <Layout>
      <Heading>Your budget.</Heading>
      <PieWrapper>
        <BudgetPie />
      </PieWrapper>
      <BudgetList />
      <ButtonContainer>
        <ActionBtn text="Add new budget" />
        <ActionBtn text="Edit budgets" />
      </ButtonContainer>
    </Layout>
  );
}

export default Budget;

const Heading = styled.h1`
  font-size: 3.33em;
  margin-bottom: 1em;
`;

const PieWrapper = styled.div`
  width: 100%;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 50%;
    margin: 0 auto;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 4em;
  display: flex;
  justify-content: space-between;
`;

const ActionBtn = styled(Button)`
  height: 4em;
  max-width: 48%;
  padding: 0;
  flex: 1;
  p {
    margin: 0;
  }
`;
