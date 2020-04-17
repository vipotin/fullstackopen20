const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = list => {
  return { type: 'INIT', data: list }
}

export const addVote = id => {
  return { type: 'VOTE', data: { id } }
}

export const addAnecdote = content => {
  return { 
    type: 'NEW_ANECDOTE', 
    data: content
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const votedItem = state.find(i => i.id === id)
      const changedItem = { ...votedItem, votes: votedItem.votes + 1 }
      const updatedList = state.map(item => item.id !== id ? item : changedItem)
      return updatedList.sort((a, b) => (b.votes - a.votes))

    case 'NEW_ANECDOTE':
      return [...state, action.data]

      default:
        return state
  }
}

export default reducer