// 1.9 Unicafe
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    const sumValues = ({good, neutral, bad}) => {
        return good + neutral + bad
    }
    const averageValue = ({good, neutral, bad}) => {
        const sum = sumValues({good, neutral, bad})
        if (sum > 0) {
            return (good*1 + neutral*0 + bad*(-1))/sum
        }
        return 0
    }
    const positivePercentage = ({good, neutral, bad}) => {
        const sum = sumValues({good, neutral, bad})
        if (sum > 0) return good/sum * 100
        return "-"
    }

    // Check if there are no feedback
    if (good===0 & neutral===0 & bad===0) {
        return (
            <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
            </div>
        )
    }

    return(
        <>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {sumValues({good, neutral, bad})}</p>
            <p>average {averageValue({good, neutral, bad})}</p>
            <p>positive {positivePercentage({good, neutral, bad})} %</p>
        </>
        )
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
