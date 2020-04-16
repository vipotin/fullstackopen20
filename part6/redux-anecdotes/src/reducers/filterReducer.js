const initialState = ''

export const filterData = content => {
  return { type: 'FILTER', data: content }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'FILTER':
      return action.data

    default: return state
  }
}

export default reducer