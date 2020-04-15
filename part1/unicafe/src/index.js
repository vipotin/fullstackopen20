// 1.10 Unicafe
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
}

// Solution for 1.10
// const StatisticLine = (props) => {
//     return <p>{props.text} {props.value}</p>
// }

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
        return good/sum * 100 + " %"
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
        <div>
            <h1>statistics</h1>
            {/* Solution for 1.10 */}
            {/* <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value={sumValues({good, neutral, bad})} />
            <StatisticLine text="average" value={averageValue({good, neutral, bad})} />
            <StatisticLine text="positive" value={positivePercentage({good, neutral, bad})} unit="%" /> */}
            <table>
                <tbody>
                    <tr>
                        <td>good</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td>
                        <td>{neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>all</td>
                        <td>{sumValues({good, neutral, bad})}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{averageValue({good, neutral, bad})}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{positivePercentage({good, neutral, bad})}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        )
}

const App = () => {
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
