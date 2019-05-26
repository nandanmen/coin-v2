import _ from 'lodash'
import reducer from './reducers'
import { types as transactionTypes } from '../transactions'
import * as types from './types'

describe('budgets reducer', () => {
  const testState = {
    food: {
      name: 'food',
      budget: 800,
      spent: 117.35,
      transactions: [0, 2],
      color: '#6D97AA'
    },
    groceries: {
      name: 'groceries',
      budget: 100,
      spent: 24.66,
      transactions: [1, 3],
      color: '#bce8ff'
    }
  }

  it('returns empty object given no state', () => {
    const state = reducer(null, {})
    expect(_.isEmpty(state)).toBeTruthy()
  })

  it('adds new budget', () => {
    const action = {
      type: types.ADD,
      payload: {
        name: 'gas',
        budget: 200,
        spent: 0,
        transactions: [],
        color: '#f7e6d5'
      }
    }
    const state = reducer(testState, action)
    expect(state).toHaveProperty('gas')
    expect(state.gas).toEqual(action.payload)
  })

  it('deletes a budget', () => {
    const action = {
      type: types.DELETE,
      payload: 'food'
    }
    const state = reducer(testState, action)
    expect(state).not.toHaveProperty('food')
  })

  it('updates budget values', () => {
    const action = {
      type: types.EDIT,
      payload: {
        name: 'food',
        budget: 300
      }
    }
    const state = reducer(testState, action)
    expect(state.food).not.toBe(testState.food)
    expect(_.omit(state.food, 'budget')).toEqual(
      _.omit(testState.food, 'budget')
    )
    expect(state.food.budget).toEqual(action.payload.budget)
  })

  describe('add transaction', () => {
    const action = {
      type: transactionTypes.ADD,
      payload: {
        id: 4,
        budget: 'food',
        account: 0,
        vendor: 'mcd',
        amount: 12.99,
        date: '2019-05-25',
        type: 'expense'
      }
    }

    it('updates transaction array of correct budget', () => {
      const state = reducer(testState, action)
      expect(state.food.transactions).toContain(action.payload.id)
    })

    it('updates spent field of budget', () => {
      const expected = testState.food.spent + action.payload.amount
      const state = reducer(testState, action)
      expect(state.food.spent).toEqual(expected)
    })

    it('ignores income transactions', () => {
      const incomeAction = {
        type: transactionTypes.ADD,
        payload: {
          id: 5,
          account: 0,
          for: 'interac',
          amount: 12.99,
          date: '2019-05-25',
          type: 'income'
        }
      }
      const state = reducer(testState, incomeAction)
      expect(state).toBe(testState)
    })
  })

  describe('delete transaction', () => {
    const action = {
      type: transactionTypes.DELETE,
      payload: {
        id: 2,
        budget: 'food',
        account: 0,
        amount: 11.03
      }
    }

    it('updates transaction array of correct budget', () => {
      const state = reducer(testState, action)
      expect(state.food.transactions).not.toContain(action.payload.id)
    })

    it('updates spent field of budget', () => {
      const expected = testState.food.spent - action.payload.amount
      const state = reducer(testState, action)
      expect(state.food.spent).toEqual(expected)
    })
  })
})
