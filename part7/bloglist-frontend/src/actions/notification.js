let timeoutId

export const setNotification = (message, severity, time) => {
  return async dispatch => {
    dispatch({ type:'SET_NOTIFICATION', data: { message, severity }})
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({ type:'CLOSE_NOTIFICATION' })
    }, time * 1000)
  }
}