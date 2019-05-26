import * as types from './types'

export const addAccount = account => ({
  type: types.ADD,
  payload: { ...account }
})

export const editAccount = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteAccount = id => ({
  type: types.DELETE,
  payload: id
})
