import * as types from './types'

let idx = 0
const colors = ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429']

export const addBudget = budget => {
  const color = colors[idx]
  idx++
  return {
    type: types.ADD,
    payload: { ...budget, spent: 0, transactions: [], color }
  }
}

export const deleteBudget = name => ({
  type: types.DELETE,
  payload: name
})

export const editBudget = partial => ({
  type: types.EDIT,
  payload: { ...partial }
})
