import _ from 'lodash'
import reducer from './reducers'
import { types as accountTypes } from '../accounts'
import { types as budgetTypes } from '../budgets'
import * as types from './types'

describe('transactions reducer', () => {
  const testState = {
    byId: {
      0: {
        id: 0,
        type: 'expense',
        vendor: 'tim hortons',
        amount: 2.09,
        date: '2019-05-07',
        account: 0,
        budget: 'food',
        note: 'Medium double double'
      },
      1: {
        id: 1,
        type: 'expense',
        vendor: 'london drugs',
        amount: 7.83,
        date: '2019-05-06',
        account: 0,
        budget: 'groceries',
        note: 'Nestle coffee'
      }
    },
    allIds: [0, 1]
  }

  it('returns empty object given no state', () => {
    const state = reducer(null, {})
    expect(_.isEmpty(state)).toBeTruthy()
  })

  it('adds new transaction', () => {
    const action = {
      type: types.ADD,
      payload: {
        id: 2,
        vendor: 'chipotle',
        amount: -11.03,
        date: '2019-05-06',
        account: 0,
        budget: 'food'
      }
    }
    const state = reducer(testState, action)
    expect(state.byId).toHaveProperty('2')
    expect(state.byId[2]).toEqual(action.payload)
  })

  it('deletes a transaction', () => {
    const action = {
      type: types.DELETE,
      payload: 1
    }
    const state = reducer(testState, action)
    expect(state.byId[1]).toBeFalsy()
    expect(state.allIds).not.toContain(1)
  })

  it('updates transaction values', () => {
    const action = {
      type: types.EDIT,
      payload: {
        id: 1,
        amount: 6
      }
    }
    const state = reducer(testState, action)
    expect(state.byId[1]).not.toBe(testState.byId[1])
    expect(_.omit(state.byId[1], 'amount')).toEqual(
      _.omit(testState.byId[1], 'amount')
    )
    expect(state.byId[1].amount).toEqual(action.payload.amount)
    expect(state.allIds).toEqual(testState.allIds)
  })

  describe('budget delete', () => {
    const action = {
      type: budgetTypes.DELETE,
      payload: 'food'
    }
    const state = reducer(testState, action)

    it('changes all transactions with deleted budget to have budget "other"', () => {
      expect(state.byId[0]).not.toBe(testState.byId[0])
      expect(state.byId[0].budget).toEqual('other')
    })

    it('maintains transaction order', () => {
      expect(state.allIds).toEqual(testState.allIds)
    })
  })

  describe('account delete', () => {
    const action = {
      type: accountTypes.DELETE,
      payload: 0
    }
    const state = reducer(testState, action)

    it('updates account of affected transactions to -1', () => {
      const affected = _.filter(testState.byId, { account: action.payload })
      const trs = _.filter(state, tr => affected.includes(tr.id))
      trs.map(tr => expect(tr.account).toEqual(-1))
    })

    it('maintains transaction order', () => {
      expect(state.allIds).toEqual(testState.allIds)
    })
  })
})
