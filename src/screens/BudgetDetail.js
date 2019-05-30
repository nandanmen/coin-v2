import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Trash } from 'styled-icons/boxicons-solid'

import { actions, selectors } from 'state/ducks/budgets'

import Layout from 'components/Layout'
import TransactionGroup from 'components/TransactionGroup'
import BackButton from 'components/BackButton'
import Empty from 'components/Empty'
import CategoryModal from 'components/CategoryModal'
import ConfirmationModal from 'components/ConfirmationModal'
import { getBreakpoint } from 'theme'

import BudgetProgress from './budgetDetail/BudgetProgress'

const { Title, Message } = ConfirmationModal

function BudgetDetail({ budget, deleteBudget }) {
  const [editing, setEditing] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const { name, transactions, budget: budgetAmount } = budget
  const initialState = {
    budget: budgetAmount,
    name
  }

  const handleDelete = () => {
    navigate('/budget')
    setTimeout(deleteBudget, 10, name)
  }

  return (
    <Layout>
      <CategoryModal
        isOpen={editing}
        hideModal={() => setEditing(false)}
        initialState={initialState}
      />
      <ConfirmationModal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onCancel={() => setConfirm(false)}
        onConfirm={handleDelete}
      >
        <Title>Are you sure?</Title>
        <Message>
          You are about to delete the {name} budget. You cannot undo this
          action.
        </Message>
      </ConfirmationModal>
      <BackButton>Budgets</BackButton>
      <Heading>
        <h1>{name}</h1>
        <Delete onClick={() => setConfirm(true)}>
          <Trash size="2em" />
        </Delete>
      </Heading>
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

export default connect(
  (state, { name }) => ({
    budget: selectors.getPopulatedBudgets(state).find(b => b.name === name)
  }),
  {
    deleteBudget: actions.deleteBudget
  }
)(BudgetDetail)

const Heading = styled.header`
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5em;
  h1 {
    font-size: 3.5em;
  }
`

const Button = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
`

const Delete = styled(Button)`
  color: ${({ theme }) => theme.colors.grays.dark};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
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
