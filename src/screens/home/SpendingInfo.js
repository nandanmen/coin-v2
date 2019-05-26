import React from 'react'
import styled from 'styled-components'
import { subMonths, subWeeks, subDays, isWithinRange, parse } from 'date-fns'
import { getBudgets } from 'utils/mock'
import { useOptions } from 'utils/hooks'
import SplitBar from './SplitBar'

const PERIOD_OPTIONS = ['day', 'week', 'month']

function filterTransactionsByPeriod(period, budgets) {
  const today = new Date()
  let after = subDays(today, 1)
  switch (period) {
    case 'month':
      after = subMonths(today, 1)
      break
    case 'week':
      after = subWeeks(today, 1)
      break
    case 'day':
    default:
      break
  }
  return budgets.map(budget => {
    return {
      name: budget.name,
      color: budget.color,
      amount: budget.transactions
        .filter(transaction =>
          isWithinRange(parse(transaction.date), after, today)
        )
        .reduce((sum, tr) => sum + tr.amount, 0)
    }
  })
}

function SpendingInfo({ className, budgets }) {
  const [active, options] = useOptions(0, PERIOD_OPTIONS)
  const mappedBudgets = filterTransactionsByPeriod(active, budgets)
  const total = mappedBudgets.reduce((sum, budget) => sum + budget.amount, 0)
  return (
    <div className={className}>
      <OptionsContainer>{options}</OptionsContainer>
      <SplitBar amounts={budgets} />
      {total ? null : <CenterText>No spendings today.</CenterText>}
    </div>
  )
}

export default SpendingInfo

const OptionsContainer = styled.div`
  margin-bottom: 1.5em;
`

const CenterText = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.dark};
`
