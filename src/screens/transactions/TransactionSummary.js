import React from 'react'
import styled from 'styled-components'
import { getBreakpoint } from 'theme'

import Icon from 'components/Icon'
import Currency from 'components/Currency'

function summarizeTransactions(transactions) {
  return transactions.reduce((result, transaction) => {
    const { budget, amount } = transaction
    if (!result[budget]) result[budget] = 0
    result[budget] += Number(amount)
    return result
  }, {})
}

function TransactionSummary({ transactions, className }) {
  const summary = summarizeTransactions(transactions)
  return (
    <Container className={className}>
      {Object.entries(summary).map(budget => (
        <Summary key={budget[0]}>
          <IconWrapper variant={budget[0]} />
          <Currency amount={budget[1]} currency="usd" />
        </Summary>
      ))}
    </Container>
  )
}

export default TransactionSummary

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${getBreakpoint(0)}) {
    flex-direction: row;
  }
`

const Summary = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${getBreakpoint(0)}) {
    margin-bottom: 0;
    margin-right: 2em;
    &:last-child {
      margin-right: 0;
    }
  }
`

const IconWrapper = styled(Icon).attrs({ size: '1.7em' })`
  width: 3em;
  height: 3em;
  background: ${({ theme }) => theme.colors.grays.med};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5em;
`
