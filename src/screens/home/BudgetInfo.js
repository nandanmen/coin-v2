import React, { useState } from 'react'
import styled from 'styled-components'
import { KeyboardArrowRight } from 'styled-icons/material'

import BlockLink from 'components/BlockLink'
import CategoryModal from 'components/CategoryModal'
import Empty from 'components/Empty'

import BudgetCard, { Container } from './BudgetCard'

function BudgetInfo({ budgets, className }) {
  const [showModal, setShowModal] = useState(false)
  const [first, second] = budgets.sort((a, b) => b.spent - a.spent)
  return (
    <>
      <CategoryModal isOpen={showModal} hideModal={() => setShowModal(false)} />
      {budgets.length ? (
        <div className={className}>
          <StyledCard category={first.name} {...first} />
          {second ? <StyledCard category={second.name} {...second} /> : null}
          <BlockLink to="/budget">
            <MoreButton>
              <KeyboardArrowRight size="4em" />
            </MoreButton>
          </BlockLink>
        </div>
      ) : (
        <Empty>
          <Empty.Title>Looks like you don't have any budgets yet.</Empty.Title>
          <Empty.Action onClick={() => setShowModal(true)}>
            Would you like to add one?
          </Empty.Action>
        </Empty>
      )}
    </>
  )
}

const StyledCard = styled(BudgetCard)`
  min-height: 22em;
`

const MoreButton = styled(Container)`
  width: 100%;
  height: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`

export default BudgetInfo
