// 1.14* Anekdootit
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomGenerator = (limit) => {
    return Math.floor(Math.random()*limit)
}

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
      ]

    const setToSelected = (newValue) => {
        setSelected(newValue)
    }
    //const [votes, setVotes] = useState()
    const [voteData, setVoteData] = useState({
        votes: new Uint8Array(6),
        mostVoted: 0
    })

    const addVote = () => {
        const newVotes = [...voteData.votes]
        newVotes[selected] += 1

        let newValue = voteData.mostVoted        
        // Find the most voted item
        for (let step = 0; step < newVotes.length; step++) {
            if (newVotes[step] > newVotes[newValue]) {
                newValue = step
            }  
        }
        setVoteData({
            votes: newVotes,
            mostVoted: newValue
        })
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>
            {anecdotes[selected]}
            </div>
            <div>
                has {voteData.votes[selected]} votes
            </div>
            <Button handleClick={() => addVote()} text="vote"/>
            <Button handleClick={() => setToSelected(randomGenerator(anecdotes.length))} text="change"/>
            <h1>Anecdote with the most votes</h1>
            <div>{anecdotes[voteData.mostVoted]}</div>
            <div>
                has {voteData.votes[voteData.mostVoted]} votes
            </div>
        </div>
    )
  }
  
ReactDOM.render(<App />, document.getElementById('root'));
