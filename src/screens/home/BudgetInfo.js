import React, { useState } from 'react'
import styled from 'styled-components'
import { KeyboardArrowRight } from 'styled-icons/material'
import BudgetCard, { Container } from './BudgetCard'
import BlockLink from 'components/BlockLink'
import CategoryModal from 'components/CategoryModal'

function BudgetInfo({ budgets, className }) {
  const [showModal, setShowModal] = useState(false)
  const [first, second] = budgets.sort((a, b) => b.spent - a.spent)
  return (
    <>
      <CategoryModal isOpen={showModal} hideModal={() => setShowModal(false)} />
      {budgets.length ? (
        <div className={className}>
          <StyledCard category={first.name} {...first} />
          <StyledCard category={second.name} {...second} />
          <BlockLink to="/budget">
            <MoreButton>
              <KeyboardArrowRight size="4em" />
            </MoreButton>
          </BlockLink>
        </div>
      ) : (
        <Empty>
          <h1>Looks like you don't have any budgets yet.</h1>
          <button onClick={() => setShowModal(true)}>
            Would you like to add one?
          </button>
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

const Empty = styled.section`
  font-size: inherit;
  margin: 5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
  button {
    cursor: pointer;
    margin-top: 1em;
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`

export default BudgetInfo
