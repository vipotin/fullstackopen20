const reducer = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case 'INIT_USERS':
      console.log(action.data)
      return action.data
    default: return state
  }
}

export default reducer