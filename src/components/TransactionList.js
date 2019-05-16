import React from 'react';
import styled from 'styled-components';

import Transaction from './transactionList/Transaction';

function TransactionList({ transactions, className }) {
  return (
    <Container className={className}>
      {transactions.length
        ? transactions.map(tr => <Transaction key={tr.id} {...tr} />)
        : `You don't have any transactions today.`}
    </Container>
  );
}

export default TransactionList;

const Container = styled.ul`
  list-style: none;
`;
