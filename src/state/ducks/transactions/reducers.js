import _ from 'lodash'
import { compareDesc } from 'date-fns'
import * as types from './types'
import { types as accountTypes } from '../accounts'
import { types as budgetTypes } from '../budgets'

/*
state shape:
{
  byId: {
    [id]: {
      id: string
      type: 'expense' | 'income'
      vendor: string
      amount: double
      date: Date
      account: string
      budget: string
      note?: string
    }
  },
  allIds: string[]
}
*/

const initialState = {
  byId: {},
  allIds: []
}

const resetTransactionCategory = (state, action) => {
  const budgetName = action.payload
  return {
    ...state,
    byId: _.mapValues(state.byId, tr => {
      if (tr.budget === budgetName) {
        return { ...tr, budget: 'other' }
      }
      return tr
    })
  }
}

const removeAccountFromTransactions = (state, action) => {
  const accountId = action.payload
  return {
    ...state,
    byId: _.mapValues(state.byId, tr => {
      if (tr.account === accountId) {
        return { ...tr, account: -1 }
      }
      return tr
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload
          }
        },
        allIds: [...state.allIds, action.payload.id].sort(compareDesc)
      }
    case types.EDIT: {
      const { id } = action.payload
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...action.payload
          }
        },
        allIds: state.allIds.sort(compareDesc)
      }
    }
    case types.DELETE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: undefined
        },
        allIds: state.allIds
          .filter(id => id !== action.payload)
          .sort(compareDesc)
      }
    case budgetTypes.DELETE:
      return resetTransactionCategory(state, action)
    case accountTypes.DELETE:
      return removeAccountFromTransactions(state, action)
    default:
      return state
  }
}

export default reducer
