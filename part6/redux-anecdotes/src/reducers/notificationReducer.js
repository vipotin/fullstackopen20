const initialState = null

export const setVoteNotification = content => {
  return { type: 'MESSAGE_VOTE', data: content}
}

export const setAddNotification = content => {
  return { type: 'MESSAGE_ADD', data: content}
}

export const closeNotification = () => {
  return { type: 'CLOSE' }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'MESSAGE_VOTE':
      return `you voted '${action.data}'`

    case 'MESSAGE_ADD':
      return `you added '${action.data}'`

    case 'CLOSE':
      return null

    default:
      return state
  }
}

export default reducer