import { omit, find } from 'lodash'
import * as types from './types'
import { types as transactionTypes } from '../transactions'

/*
state shape:
{
  [name]: {
    name: string
    budget: number
    spent: number
    transactions: number[]
    color: string
  }
}
*/

const initialState = {}

const addTransactionToBudget = (state, action) => {
  const { id, budget, amount } = action.payload
  const prevBudget = state[budget]
  return {
    ...state,
    [budget]: {
      ...prevBudget,
      spent: prevBudget.spent + amount,
      transactions: [...prevBudget.transactions, id]
    }
  }
}
const deleteTransactionFromBudget = (state, action) => {
  const { id, amount } = action.payload
  const budget = find(state, b => b.transactions.includes(id))
  if (!budget) return state
  return {
    ...state,
    [budget.name]: {
      ...budget,
      spent: budget.spent - amount,
      transactions: budget.transactions.filter(bid => bid !== id)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD:
      return {
        ...state,
        [action.payload.name]: {
          ...action.payload
        }
      }
    case types.EDIT:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          ...action.payload
        }
      }
    case types.DELETE:
      return omit(state, action.payload)
    case transactionTypes.ADD:
      return addTransactionToBudget(state, action)
    case transactionTypes.DELETE:
      return deleteTransactionFromBudget(state, action)
    default:
      return state
  }
}

export default reducer
