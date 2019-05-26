import * as types from './types'

export const addBudget = budget => ({
  type: types.ADD,
  payload: { ...budget, spent: 0, transactions: [], color: '#bce8ff' }
})

export const deleteBudget = name => ({
  type: types.DELETE,
  payload: name
})

export const editBudget = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})
