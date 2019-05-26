import * as types from './types'

const initialState = {
  byId: {},
  allIds: []
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
        allIds: [...state.allIds, { ...action.payload }]
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
        }
      }
    }
    case types.DELETE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: undefined
        },
        allIds: state.allIds.filter(id => id !== action.payload)
      }
    default:
      return state
  }
}

export default reducer
