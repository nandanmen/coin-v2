import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { budgetSelectors } from 'state/ducks'

import Layout from 'components/Layout'
import Button from 'components/Button'
import CategoryModal from 'components/CategoryModal'
import Empty from 'components/Empty'
import { getBreakpoint } from 'theme'

import BudgetPie from './budget/BudgetPie'
import BudgetList from './budget/BudgetList'

function Budget({ budgets }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Layout>
      <CategoryModal isOpen={showModal} hideModal={() => setShowModal(false)} />
      <Layout.Heading>Your budget.</Layout.Heading>
      {budgets.length ? (
        <>
          <PieWrapper>
            <BudgetPie budgets={budgets} />
          </PieWrapper>
          <BudgetList budgets={budgets} />
          <ButtonContainer>
            <ActionBtn
              onClick={() => setShowModal(true)}
              text="Add new budget"
            />
            <ActionBtn text="Edit budgets" />
          </ButtonContainer>
        </>
      ) : (
        <Empty>
          <Empty.Title>Looks like you don't have any budgets yet.</Empty.Title>
          <Empty.Action onClick={() => setShowModal(true)}>
            Add a budget
          </Empty.Action>
        </Empty>
      )}
    </Layout>
  )
}

export default connect(state => ({
  budgets: budgetSelectors.getBudgets(state)
}))(Budget)

const PieWrapper = styled.div`
  width: 100%;
  @media (min-width: ${getBreakpoint(0)}) {
    width: 50%;
    margin: 0 auto;
  }
`

const ButtonContainer = styled.div`
  margin-top: 4em;
  display: flex;
  justify-content: space-between;
`

const ActionBtn = styled(Button)`
  height: 4em;
  max-width: 48%;
  padding: 0;
  flex: 1;
  p {
    margin: 0;
  }
`
