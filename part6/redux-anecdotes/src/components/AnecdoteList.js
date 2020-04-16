import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setVoteNotification, closeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = useSelector(state => state.anecdotes.filter(item => item.content.includes(filter)))
  const allAnecdotes = useSelector(state => state.anecdotes)

  const anecdotes = (filter === '') ? allAnecdotes : filteredAnecdotes
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setVoteNotification(content))
    setTimeout(() => {
      dispatch(closeNotification())
    }, 5000)
  }

  return (
    <div>
        {allAnecdotes.filter(item => item.content.includes(filter))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList