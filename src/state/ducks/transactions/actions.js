import uuid from 'uuid/v4'
import * as types from './types'

export const addTransaction = transaction => ({
  type: types.ADD,
  payload: { id: uuid(), ...transaction }
})

export const editTransaction = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteTransaction = transaction => ({
  type: types.DELETE,
  payload: { ...transaction }
})
