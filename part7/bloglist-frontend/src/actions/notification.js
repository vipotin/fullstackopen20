let timeoutId

export const setNotification = (message, error, time) => {
  return async dispatch => {
    dispatch({ type:'SET', data: { message, error }})
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({ type:'RESET' })
    }, time * 1000)
  }
}