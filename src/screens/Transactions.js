import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import { getTransactions } from 'utils/mock';

import Week from './transactions/Week';
import Month from './transactions/Month';
import TransactionList from './transactions/TransactionList';

const periods = ['week', 'month'];

// fetch appropriate transactions
const fetchTransactions = () => getTransactions();

function Transactions() {
  const today = new Date();

  const [activePeriod, setActivePeriod] = useState(periods[1]);
  const [activeDate, setActiveDate] = useState(today);
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
      <div>
        {periods.map((period, index) => (
          <button key={period} value={index} onClick={handlePeriodChange}>
            {period}
          </button>
        ))}
      </div>
      {activePeriod === 'week' ? (
        <Week onClick={handleDateChange} activeDate={activeDate} />
      ) : activePeriod === 'month' ? (
        <Month onClick={handleDateChange} activeDate={activeDate} />
      ) : null}
      <TransactionList transactions={transactions} />
    </Layout>
  );
}

export default Transactions;

const Heading = styled.h1`
  font-size: 3.33em;
  margin-bottom: 1em;
`;
