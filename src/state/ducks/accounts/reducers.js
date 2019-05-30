import { omit } from 'lodash'
import * as types from './types'
import { types as transactionTypes } from '../transactions'

/*
state shape:
{
  [id]: {
    id: string | number
    bank: string
    accountType: 'credit' | 'debit'
    cardType: 'visa' | 'mastercard' | 'amex'
    balance: number
    number: number
    transactions: (string | number)[]
    color: string
  }
}
*/

const initialState = {}

const addTransactionToAccount = (state, action) => {
  const { id, account, amount } = action.payload
  const prevAccount = state[account]
  return {
    ...state,
    [account]: {
      ...prevAccount,
      balance:
        prevAccount.accountType === 'debit'
          ? Number(prevAccount.balance) - amount
          : Number(prevAccount.balance) + amount,
      transactions: [...prevAccount.transactions, id]
    }
  }
}
const deleteTransactionFromAccount = (state, action) => {
  const { id, account, amount } = action.payload
  const prevAccount = state[account]
  return {
    ...state,
    [account]: {
      ...prevAccount,
      balance:
        prevAccount.accountType === 'debit'
          ? Number(prevAccount.balance) + amount
          : Number(prevAccount.balance) - amount,
      transactions: prevAccount.transactions.filter(bid => bid !== id)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload
        }
      }
    case types.EDIT:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      }
    case types.DELETE:
      return omit(state, action.payload)
    case transactionTypes.ADD:
      return addTransactionToAccount(state, action)
    case transactionTypes.DELETE:
      return deleteTransactionFromAccount(state, action)
    default:
      return state
  }
}

export default reducer
