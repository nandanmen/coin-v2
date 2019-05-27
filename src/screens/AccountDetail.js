import React from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/ducks/accounts'

import Layout from 'components/Layout'
import BankCard from 'components/BankCard'
import BackButton from 'components/BackButton'
import TransactionGroup from 'components/TransactionGroup'
import Empty from 'components/Empty'
import { getBreakpoint } from 'theme'

function AccountDetail({ account }) {
  const { transactions } = account
  return (
    <Layout>
      <Back>Accounts</Back>
      <CardContainer>
        <Card {...account} />
      </CardContainer>
      <Transactions>
        <h1>Recent Transactions</h1>
        {transactions.length ? (
          <TransactionGroup transactions={transactions} />
        ) : (
          <Empty>
            <Empty.Title>
              You don't have any transactions for this account.
            </Empty.Title>
            <Empty.Action onClick={() => navigate('/add')}>
              Add a new transaction
            </Empty.Action>
          </Empty>
        )}
      </Transactions>
    </Layout>
  )
}

export default connect((state, { id }) => ({
  account: selectors.getAccountById(id, state)
}))(AccountDetail)

const Back = styled(BackButton)`
  margin-bottom: 2em;
`

const CardContainer = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4em;
`

const Card = styled(BankCard)`
  width: 100%;
  height: 16em;
  margin: 0 auto;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 70%;
  }
`

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
`
