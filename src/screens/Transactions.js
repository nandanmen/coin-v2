import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import TransactionList from 'components/TransactionList';
import { getTransactions } from 'utils/mock';
import { useOptions } from 'utils/hooks';

import Week from './transactions/Week';
import Month from './transactions/Month';
import TransactionSummary from './transactions/TransactionSummary';

const periods = ['week', 'month'];

// fetch appropriate transactions
const fetchTransactions = () => getTransactions();

function Transactions() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [activePeriod, selections] = useOptions(1, periods);

  useEffect(() => {
    const result = fetchTransactions(activeDate);
    setTransactions(result);
  }, [activeDate]);

  const handleDateChange = date => setActiveDate(date);

  return (
    <Layout>
      <Layout.Heading>Your transactions.</Layout.Heading>
      <PeriodContainer>{selections}</PeriodContainer>
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

const PeriodContainer = styled.div`
  margin-bottom: 3em;
`;

const TransactionGroup = styled.div`
  margin-top: 3em;
`;

const List = styled(TransactionList)`
  margin-bottom: 4em;
`;
