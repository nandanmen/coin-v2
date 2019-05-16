import React from 'react';
import styled from 'styled-components';
import { groupBy } from 'lodash';
import { format, compareDesc, isToday } from 'date-fns';
import TransactionList from './TransactionList';

function TransactionGroup({ transactions }) {
  const transactionsByDate = groupBy(transactions, 'date');
  const descDates = Object.keys(transactionsByDate).sort(compareDesc);
  return (
    <div>
      {descDates.map(date => (
        <Section key={date}>
          <h1>{isToday(date) ? 'Today' : format(date, 'DD MMM YY')}</h1>
          <TransactionList transactions={transactionsByDate[date]} />
        </Section>
      ))}
    </div>
  );
}

export default TransactionGroup;

const Section = styled.section`
  margin-bottom: 1.5em;
  > h1 {
    margin-bottom: 1em;
    color: ${({ theme }) => theme.colors.grays.dark};
  }
`;
