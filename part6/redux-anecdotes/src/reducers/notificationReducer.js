const initialState = null

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch({ type: 'SET', data: message })
    const timeoutID = setTimeout(() => {
      dispatch({ type: 'CLOSE' })
    }, (time*1000))
    clearTimeout(timeoutID - 1)
  }
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case 'SET':
      return action.data

    case 'CLOSE':
      return null

    default:
      return state
  }
}

export default reducer