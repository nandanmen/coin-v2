import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowRight } from 'styled-icons/material';
import BudgetCard, { Container } from './BudgetCard';
import BlockLink from 'components/BlockLink';

function BudgetInfo({ budgets, className }) {
  const [first, second] = budgets.sort((a, b) => b.spent - a.spent);
  return (
    <div className={className}>
      <StyledCard category={first.name} {...first} />
      <StyledCard category={second.name} {...second} />
      <BlockLink to="/budget">
        <MoreButton>
          <KeyboardArrowRight size="4em" />
        </MoreButton>
      </BlockLink>
    </div>
  );
}

const StyledCard = styled(BudgetCard)`
  min-height: 22em;
`;

const MoreButton = styled(Container)`
  width: 100%;
  height: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default BudgetInfo;
