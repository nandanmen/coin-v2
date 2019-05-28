import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Form, Select, Input } from '@narendras/components'
import { format } from 'date-fns'
import { getBreakpoint } from 'theme'
import { capitalize } from 'utils'

import { accountSelectors, budgetSelectors } from 'state/ducks'
import { actions } from 'state/ducks/transactions'

import CardModal from 'components/CardModal'
import CategoryModal from 'components/CategoryModal'

const Field = Form.Field
const Option = Select.Option

function getAccountValue(account) {
  const { bank, accountType, number } = account
  return [bank, accountType, number].join(' ')
}

function AddTransaction({ type, accounts, budgets, addTransaction }) {
  const [vendor, setVendor] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'))
  const [account, setAccount] = useState(0)
  const [budget, setBudget] = useState('')
  const [editingCard, setEditingCard] = useState(false)
  const [editingCategory, setEditingCategory] = useState(false)

  const searchAccount = (value, option) => {
    const account = accounts.filter(account => account.id === option)
    const val = getAccountValue(account)
    return RegExp(`${value}`, 'i').test(val)
  }

  const handleClick = (callback, ...args) => evt => {
    evt.preventDefault()
    callback(...args)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    const transaction = {
      type,
      vendor,
      amount,
      date,
      account,
      budget
    }
    addTransaction(transaction)
    window.history.back()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CardModal
        isOpen={editingCard}
        hideModal={handleClick(setEditingCard, false)}
      />
      <CategoryModal
        isOpen={editingCategory}
        hideModal={handleClick(setEditingCategory, false)}
      />
      <Group>
        <Field label={type === 'expense' ? 'vendor' : 'for'}>
          <Input value={vendor} onChange={e => setVendor(e.target.value)} />
        </Field>
        <Field label="amount">
          <Input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </Field>
        <Field label="date">
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </Field>
      </Group>
      <Group>
        <Field label="account">
          <>
            <Select
              hasSearch
              searchFn={searchAccount}
              value={account}
              onChange={e => setAccount(e.target.value)}
            >
              {accounts.map(account => {
                const value = getAccountValue(account)
                return (
                  <Option key={account.id} value={account.id}>
                    {capitalize(value)}
                  </Option>
                )
              })}
            </Select>
            <Button onClick={handleClick(setEditingCard, true)}>
              Add new account
            </Button>
          </>
        </Field>
        {type === 'expense' ? (
          <Field label="category">
            <>
              <Select
                hasSearch
                value={budget}
                onChange={e => setBudget(e.target.value)}
              >
                {budgets
                  .map(budget => budget.name)
                  .map(name => (
                    <Option key={name} value={name}>
                      {capitalize(name)}
                    </Option>
                  ))}
              </Select>
              <Button onClick={handleClick(setEditingCategory, true)}>
                Add new category
              </Button>
            </>
          </Field>
        ) : null}
      </Group>
      <Submit type="submit" onClick={handleSubmit}>
        Add transaction
      </Submit>
    </Form>
  )
}

export default connect(
  state => ({
    accounts: accountSelectors.getAccounts(state),
    budgets: budgetSelectors.getBudgets(state)
  }),
  { addTransaction: actions.addTransaction }
)(AddTransaction)

const Group = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: ${getBreakpoint(0)}) {
    flex-direction: row;
    > * {
      margin-right: 1em;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.colors.grays.dark};
  margin-top: 1em;
  text-align: left;
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`

const Submit = styled.button`
  font-size: 1.2em;
  padding: 1em 1.5em;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5em;
  margin-top: 1em;
  outline: none;
  cursor: pointer;
`
