import React from 'react';

function TransactionList({ transactions }) {
  return transactions.map(tr => (
    <li key={tr.id}>
      <h1>{tr.vendor}</h1>
      <p>{tr.amount * -1}</p>
    </li>
  ));
}

export default TransactionList;
