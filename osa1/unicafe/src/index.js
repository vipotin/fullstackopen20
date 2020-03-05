// 1.7 Unicafe
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

const Display = (props) => {
    return <p>{props.text} {props.value}</p>
}

const sumValues = ([good, neutral, bad]) => {
    return good + neutral + bad
}

const positivePercentage = (table) => {
    const sum = sumValues(table)
    if (sum > 0) return table[0]/sum * 100
    return "-"
}

const averageValue = (table) => {
    const sum = sumValues(table)
    if (sum > 0) {
        return (table[0]*1 + table[1]*0 + table[2]*(-1))/sum
    }
    return 0
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
      <Display text="all" value={sumValues([good, neutral, bad])} />
      <Display text="average" value={averageValue([good, neutral, bad])} />
      <p>positive {positivePercentage([good, neutral, bad])} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
