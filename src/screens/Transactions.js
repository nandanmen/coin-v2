import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import Layout from 'components/Layout';
import TransactionList from 'components/TransactionList';
import { getTransactions } from 'utils/mock';

import Week from './transactions/Week';
import Month from './transactions/Month';
import TransactionSummary from './transactions/TransactionSummary';

const periods = ['week', 'month'];

// fetch appropriate transactions
const fetchTransactions = () => getTransactions();

function Transactions() {
  const [activePeriod, setActivePeriod] = useState(periods[1]);
  const [activeDate, setActiveDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const result = fetchTransactions(activeDate);
    setTransactions(result);
  }, [activeDate]);

  const handlePeriodChange = evt => setActivePeriod(periods[evt.target.value]);
  const handleDateChange = date => setActiveDate(date);

  return (
    <Layout>
      <Heading>Your transactions.</Heading>
      <PeriodContainer>
        {periods.map((period, index) => (
          <OptionBtn
            key={period}
            value={index}
            onClick={handlePeriodChange}
            variant={period === activePeriod ? 'active' : null}
          >
            {period}
          </OptionBtn>
        ))}
      </PeriodContainer>
      {activePeriod === 'week' ? (
        <Week onClick={handleDateChange} activeDate={activeDate} />
      ) : activePeriod === 'month' ? (
        <Month onClick={handleDateChange} activeDate={activeDate} />
      ) : null}
      <TransactionGroup>
        <List transactions={transactions} />
        <TransactionSummary transactions={transactions} />
      </TransactionGroup>
    </Layout>
  );
}

export default Transactions;

const Heading = styled.h1`
  font-size: 3.33em;
  margin-bottom: 1.5em;
`;

const PeriodContainer = styled.div`
  margin-bottom: 3em;
`;

const TransactionGroup = styled.div`
  margin-top: 3em;
`;

const List = styled(TransactionList)`
  margin-bottom: 4em;
`;

const OptionBtn = styled.button`
  text-transform: capitalize;
  position: relative;
  font-size: 1.2em;
  margin-right: 2em;
  font-weight: 500;
  padding-bottom: 0.5em;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  outline: none;

  ${({ variant }) =>
    variant === 'active' &&
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
