import React from 'react'
import { navigate } from '@reach/router'
import styled from 'styled-components'

import Empty from './Empty'
import Transaction from './transactionList/Transaction'

function TransactionList({ transactions, className }) {
  return (
    <Container className={className}>
      {transactions.length ? (
        transactions.map(tr => <Transaction key={tr.id} {...tr} />)
      ) : (
        <Empty>
          <Empty.Title>You don't have any transactions today.</Empty.Title>
          <Empty.Action onClick={() => navigate('/add')}>
            Add a transaction
          </Empty.Action>
        </Empty>
      )}
    </Container>
  )
}

export default TransactionList

const Container = styled.ul`
  list-style: none;
`
