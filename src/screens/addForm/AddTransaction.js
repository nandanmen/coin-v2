import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Select, Input } from '@narendras/components'
import { format } from 'date-fns'
import { getBreakpoint } from 'theme'
import { capitalize } from 'utils'
import { getAccounts, getAccountById, getBudgets } from 'utils/mock'
import CardModal from 'components/CardModal'

const Field = Form.Field
const Option = Select.Option

function getAccountValue(account) {
  const { bank, accountType, number } = account
  return [bank, accountType, number].join(' ')
}

function searchAccount(value, option) {
  const account = getAccountValue(getAccountById(option))
  return RegExp(`${value}`, 'i').test(account)
}

function AddTransaction({ type }) {
  const [vendor, setVendor] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'))
  const [card, setCard] = useState(0)
  const [category, setCategory] = useState('')
  const [editingCard, setEditingCard] = useState(false)
  const [editingCategory, setEditingCategory] = useState(false)

  const handleClick = (callback, ...args) => e => {
    e.preventDefault()
    callback(...args)
  }

  return (
    <Form>
      <CardModal
        isOpen={editingCard}
        hideModal={handleClick(setEditingCard, false)}
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
              value={card}
              onChange={e => setCard(e.target.value)}
            >
              {getAccounts().map(account => {
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
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {getBudgets()
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
    </Form>
  )
}

export default AddTransaction

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

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`
