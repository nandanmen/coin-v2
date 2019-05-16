import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import BankCard from 'components/BankCard';
import BackButton from 'components/BackButton';
import TransactionGroup from 'components/TransactionGroup';
import { getAccountById, getTransactions } from 'utils/mock';
import { getBreakpoint } from 'theme';

function AccountDetail({ id }) {
  const account = getAccountById(id);
  const transactions = getTransactions();
  return (
    <Layout>
      <Back>Accounts</Back>
      <CardContainer>
        <Card {...account} />
      </CardContainer>
      <Transactions>
        <h1>Recent Transactions</h1>
        <TransactionGroup transactions={transactions} />
      </Transactions>
    </Layout>
  );
}

export default AccountDetail;

const Back = styled(BackButton)`
  margin-bottom: 2em;
`;

const CardContainer = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4em;
`;

const Card = styled(BankCard)`
  width: 100%;
  height: 16em;
  margin: 0 auto;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 70%;
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
