const initialState = null

const reducer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'SET':
      return action.data
    case 'RESET':
      return null
    default: return state
  }
}
export default reducer