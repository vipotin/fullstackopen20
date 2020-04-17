import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: anecdotes })
  }
}

export const addVote = object => {
  return async dispatch => {
    const id = await anecdoteService.update(object)
    dispatch({ type: 'VOTE', data: { id } })
  } 
}

export const addAnecdote = content => {
  return async dispatch => {
    const newObject = await anecdoteService.createNew(content)
    dispatch({ type: 'NEW_ANECDOTE', data: newObject })
  }
}

const reducer = (state = [], action) => {
  
  switch(action.type) {
    case 'INIT':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const votedItem = state.find(i => i.id === id)
      const changedItem = { ...votedItem, votes: votedItem.votes + 1 }
      const updatedList = state.map(item => item.id !== id ? item : changedItem)
      return updatedList

    case 'NEW_ANECDOTE':
      return [...state, action.data]

      default:
        return state
  }
}

export default reducer