const initialState = {
  modalType: null
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MODAL/SHOW':
      return {
        ...state,
        modalType: action.payload
      }
    case 'MODAL/HIDE':
      return initialState
    default:
      return state
  }
}
