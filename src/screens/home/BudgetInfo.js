import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowRight } from 'styled-icons/material';
import BudgetCard, { Container } from './BudgetCard';

function BudgetInfo({ budgets, className }) {
  const [first, second] = budgets.sort((a, b) => b.spent - a.spent);
  return (
    <div className={className}>
      <StyledCard category={first.name} {...first} />
      <StyledCard category={second.name} {...second} />
      <MoreButton>
        <NextIcon size="4em" />
      </MoreButton>
    </div>
  );
}

const StyledCard = styled(BudgetCard)`
  min-height: 22em;
`;

const MoreButton = styled(Container)`
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const NextIcon = styled(KeyboardArrowRight)`
  color: ${({ theme }) => theme.colors.grays.dark};
`;

export default BudgetInfo;
