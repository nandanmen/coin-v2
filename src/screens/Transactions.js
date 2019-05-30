import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isSameDay, format } from 'date-fns'

import { selectors } from 'state/ducks/transactions'

import Layout from 'components/Layout'
import TransactionList from 'components/TransactionList'
import { useOptions } from 'utils/hooks'

import Week from './transactions/Week'
import Month from './transactions/Month'
import TransactionSummary from './transactions/TransactionSummary'

const periods = ['week', 'month']

function Transactions({ transactions }) {
  const [activeDate, setActiveDate] = useState(new Date())
  const [activePeriod, selections] = useOptions(1, periods)
  const activeTransactions = transactions.filter(tr =>
    isSameDay(tr.date, activeDate)
  )

  const handleDateChange = date => setActiveDate(date)

  return (
    <Layout>
      <Layout.Heading>Your transactions.</Layout.Heading>
      <PeriodContainer>{selections}</PeriodContainer>
      {activePeriod === 'week' ? (
        <Week onClick={handleDateChange} activeDate={activeDate} />
      ) : activePeriod === 'month' ? (
        <Month onClick={handleDateChange} activeDate={activeDate} />
      ) : null}
      <TransactionGroup>
        <h1>Transactions on {format(activeDate, 'DD MMM')}</h1>
        <List transactions={activeTransactions} />
        <TransactionSummary transactions={activeTransactions} />
      </TransactionGroup>
    </Layout>
  )
}

export default connect(state => ({
  transactions: selectors.getTransactions(state)
}))(Transactions)

const PeriodContainer = styled.div`
  margin-bottom: 3em;
`

const TransactionGroup = styled.section`
  margin-top: 3em;
  > h1 {
    margin-bottom: 1.5em;
    color: ${({ theme }) => theme.colors.grays.dark};
  }
`

const List = styled(TransactionList)`
  margin-bottom: 4em;
`
