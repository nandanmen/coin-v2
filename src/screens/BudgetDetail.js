import React from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { budgetSelectors } from 'state/ducks'

import Layout from 'components/Layout'
import TransactionGroup from 'components/TransactionGroup'
import BackButton from 'components/BackButton'
import Empty from 'components/Empty'
import { getBreakpoint } from 'theme'

import BudgetProgress from './budgetDetail/BudgetProgress'

function BudgetDetail({ budget }) {
  const { name, transactions } = budget
  return (
    <Layout>
      <BackButton>Budgets</BackButton>
      <Heading>{name}</Heading>
      <PieWrapper>
        <BudgetProgress {...budget} />
      </PieWrapper>
      <Transactions>
        <h1>Recent Transactions</h1>
        {transactions.length ? (
          <TransactionGroup transactions={transactions} />
        ) : (
          <Empty>
            <Empty.Title>No transactions yet.</Empty.Title>
            <Empty.Action onClick={() => navigate('/add')}>
              Add a transaction
            </Empty.Action>
          </Empty>
        )}
      </Transactions>
    </Layout>
  )
}

export default connect((state, { name }) => ({
  budget: budgetSelectors.getPopulatedBudgets(state).find(b => b.name === name)
}))(BudgetDetail)

const Heading = styled(Layout.Heading)`
  text-transform: capitalize;
`

const PieWrapper = styled.div`
  width: 100%;
  margin: 4em 0;
  margin-top: 0;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
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
