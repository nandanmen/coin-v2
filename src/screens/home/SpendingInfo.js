import React from 'react';
import styled, { css } from 'styled-components';
import { subMonths, subWeeks, subDays, isWithinRange, parse } from 'date-fns';
import { getBudgets } from 'utils/mock';
import SplitBar from './SplitBar';

const PERIOD_OPTIONS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

function getMockTransactions(period) {
  const today = new Date();
  let after = subDays(today, 1);
  switch (period) {
    case PERIOD_OPTIONS.MONTH:
      after = subMonths(today, 1);
      break;
    case PERIOD_OPTIONS.WEEK:
      after = subWeeks(today, 1);
      break;
    case PERIOD_OPTIONS.DAY:
    default:
      break;
  }
  return getBudgets().map(budget => {
    return {
      name: budget.name,
      color: budget.color,
      amount:
        budget.transactions
          .filter(transaction =>
            isWithinRange(parse(transaction.date), after, today)
          )
          .reduce((sum, tr) => sum + tr.amount, 0) * -1
    };
  });
}

function SpendingInfo({ className }) {
  const [activePeriod, setActivePeriod] = React.useState(PERIOD_OPTIONS.DAY);
  const budgets = getMockTransactions(activePeriod);
  const total = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  return (
    <div className={className}>
      <OptionsContainer>
        {Object.keys(PERIOD_OPTIONS).map(option => (
          <OptionBtn
            key={option}
            onClick={() => setActivePeriod(PERIOD_OPTIONS[option])}
            isActive={PERIOD_OPTIONS[option] === activePeriod}
          >
            {option.toLowerCase()}
          </OptionBtn>
        ))}
      </OptionsContainer>
      <SplitBar amounts={budgets} />
      {total ? null : <CenterText>No spendings today.</CenterText>}
    </div>
  );
}

export default SpendingInfo;

const OptionsContainer = styled.div`
  margin-bottom: 1.5em;
`;

const OptionBtn = styled.button`
  text-transform: capitalize;
  position: relative;
  margin-right: 2em;
  font-size: 1.5em;
  font-weight: 500;
  padding-bottom: 0.5em;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  outline: none;

  ${({ isActive }) =>
    isActive &&
    css`
      &:after {
        content: '';
        position: absolute;
        background: ${({ theme }) => theme.colors.black};
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
      }
    `}
`;

const CenterText = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.dark};
`;
