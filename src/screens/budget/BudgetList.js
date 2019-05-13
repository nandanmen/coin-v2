import React from 'react';
import styled from 'styled-components';

import ProgressBar from 'components/ProgressBar';
import BlockLink from 'components/BlockLink';
import { getBudgets } from 'utils/mock';

function BudgetList({ budgets = getBudgets() }) {
  return (
    <Container>
      {budgets.map(budget => (
        <Budget key={budget.name} to={budget.name}>
          <Title>{budget.name}</Title>
          <Progress
            percentage={(budget.spent / budget.budget) * 100}
            color={budget.color}
          />
          <Percentage>
            {((budget.spent / budget.budget) * 100).toFixed(0)}%
          </Percentage>
        </Budget>
      ))}
    </Container>
  );
}

export default BudgetList;

const Container = styled.div`
  margin-top: 4em;
`;

const Budget = styled(BlockLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    position: relative;
    color: ${({ theme }) => theme.colors.blue};
    &:before {
      position: absolute;
      content: '';
      width: 2px;
      height: 100%;
      top: 0;
      left: -2em;
      background: ${({ theme }) => theme.colors.blue};
    }
    &:after {
      position: absolute;
      content: '';
      width: 2px;
      height: 100%;
      top: 0;
      right: -2em;
      background: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const Title = styled.h1`
  flex: 2;
  font-size: 1.2em;
  text-transform: capitalize;
  font-weight: 500;
`;

const Percentage = styled.p`
  flex: 1;
  font-size: 1.2em;
  text-align: right;
`;

const Progress = styled(ProgressBar)`
  height: 1.2em;
  flex: 4;
  margin: 0 1em;
`;
