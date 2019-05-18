import React from 'react';
import styled from 'styled-components';
import { string, number } from 'prop-types';

import Card from 'components/Card';
import Currency from 'components/Currency';
import ProgressBar from 'components/ProgressBar';
import BlockLink from 'components/BlockLink';

function BudgetCard({ className, category, spent, budget, color }) {
  const proportionSpent = (spent / budget) * 100;
  return (
    <BlockLink to={`/budget/${category}`}>
      <Container className={className}>
        <Percentage>{proportionSpent.toFixed(2)}%</Percentage>
        <div>
          <Spent amount={spent} currency="usd" />
          <Budget amount={budget} currency="usd" />
        </div>
        <div>
          <Title>{category}</Title>
          <ProgressBar percentage={proportionSpent} color={color} />
        </div>
      </Container>
    </BlockLink>
  );
}

BudgetCard.propTypes = {
  category: string.isRequired,
  spent: number.isRequired,
  budget: number.isRequired,
  color: string
};

export default BudgetCard;

export const Container = styled(Card)`
  width: 100%;
  padding: 3em 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.grays.dark};
`;

const Title = styled(Card.Title)`
  color: ${({ theme }) => theme.colors.grays.dark};
  font-size: 2em;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const Budget = styled(Currency)`
  color: ${({ theme }) => theme.colors.grays.dark};
  font-weight: 400;
  font-size: 1.5em;
`;

const Spent = styled(Currency)`
  font-size: 2.5em;
`;

const Percentage = styled.p`
  font-size: 1.67em;
  color: ${({ theme }) => theme.colors.grays.dark};
`;
