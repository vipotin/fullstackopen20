// 1.6 Unicafe
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

const Display = (props) => {
    return <p>{props.text} {props.value}</p>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
      setGood(newValue)
  }

  const setToNeutral = (newValue) => {
      setNeutral(newValue)
  }

  const setToBad = (newValue) => {
      setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)}  text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)}  text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)}  text="bad" />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
