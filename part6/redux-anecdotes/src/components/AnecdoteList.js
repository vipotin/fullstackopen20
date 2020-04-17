import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdoteList = useSelector(state => state.anecdotes
    .filter(item => item.content.includes(filter)))
    .sort((a, b) => (b.votes - a.votes))
  
  const dispatch = useDispatch()

  const vote = (object) => {
    dispatch(addVote(object))
    dispatch(setNotification(`you voted '${object.content}'`, 4))
  }

  return (
    <div>
        {anecdoteList
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList