const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLOSE_NOTIFICATION':
      return null
    default: return state
  }
}
export default reducer