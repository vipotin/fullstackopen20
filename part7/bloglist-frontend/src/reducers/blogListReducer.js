

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'NEW_LIKE':
      return state.map(b => b.id !== action.data.id ? b : action.data)
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default: return state
  }
}

export default reducer