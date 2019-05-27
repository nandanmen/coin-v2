import * as types from './types'
import uuid from 'uuid/v4'

export const addAccount = account => ({
  type: types.ADD,
  payload: { id: uuid(), ...account, transactions: [], color: '#333333' }
})

export const editAccount = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteAccount = id => ({
  type: types.DELETE,
  payload: id
})
