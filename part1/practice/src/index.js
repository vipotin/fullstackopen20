import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Hello = ({name, age}) => { 
    const bornYear = () => new Date().getFullYear() - age
    return (
      <div>
        <p>Hello {name}, you are {age} years old</p>
        <p>So you were probably born {bornYear()} </p>
      </div>
    )
}

// const App = () => {
//     const nimi = 'Pekka'
//     const ika = 23

//     return (
//         <>
//             <h1>Greetings</h1>
//             <Hello name="Maya" age={26 + 10} />
//             <Hello name={nimi} age={ika} />
//         </>
//     )
// }

const App = (props) => {
    const [ counter, setCounter ] = useState(0)
    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)

    const Display = (props) => {
        return (
          <div>{props.counter}</div>
        )
      }

    return(
        <div>
            <Display counter={counter} />
            <button onClick={increaseByOne}>plus</button>
            <button onClick={setToZero}>0</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

