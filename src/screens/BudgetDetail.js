import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import TransactionGroup from 'components/TransactionGroup';
import BackButton from 'components/BackButton';
import BudgetProgress from './budgetDetail/BudgetProgress';
import { getBudgetByName, getTransactions } from 'utils/mock';
import { getBreakpoint } from 'theme';

function BudgetDetail({ name }) {
  const budget = getBudgetByName(name);
  const transactions = getTransactions();
  return (
    <Layout>
      <BackButton>Budgets</BackButton>
      <Heading>{name}</Heading>
      <PieWrapper>
        <BudgetProgress {...budget} />
      </PieWrapper>
      <Transactions>
        <h1>Recent Transactions</h1>
        <TransactionGroup transactions={transactions} />
      </Transactions>
    </Layout>
  );
}

export default BudgetDetail;

const Heading = styled(Layout.Heading)`
  text-transform: capitalize;
`;

const PieWrapper = styled.div`
  width: 100%;
  margin: 4em 0;
  margin-top: 0;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Transactions = styled.section`
  > * {
    margin-bottom: 1em;
  }
  > h1 {
    font-size: 2em;
  }
  > h2 {
    color: ${({ theme }) => theme.colors.grays.dark};
    margin-top: 1.5em;
  }
`;
