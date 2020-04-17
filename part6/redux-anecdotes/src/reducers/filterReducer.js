const initialState = ''

export const filterData = content => {
  return { type: 'FILTER', data: content }
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case 'FILTER':
      return action.data

    default: return state
  }
}

export default reducer