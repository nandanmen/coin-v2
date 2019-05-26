import * as types from './types'

export const addTransaction = transaction => ({
  type: types.ADD,
  payload: { ...transaction }
})

export const editTransaction = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteTransaction = transaction => ({
  type: types.DELETE,
  payload: { ...transaction }
})
