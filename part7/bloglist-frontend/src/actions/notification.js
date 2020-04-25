let timeoutId

export const setNotification = (message, error, time) => {
  return async dispatch => {
    dispatch({ type:'SET_NOTIFICATION', data: { message, error }})
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({ type:'CLOSE_NOTIFICATION' })
    }, time * 1000)
  }
}