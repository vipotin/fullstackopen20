// Kurssitiedot (valmis)
import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return <p>{props.part} {props.exercises}</p>
}

const Total = (table) => {
    return <p>Number of exercises {table.parts[0].exercises + table.parts[1].exercises + 
        table.parts[2].exercises}</p>
}

const Content = (table) => {
    return (
        <div>
            <Part part={table.parts[0].name} exercises={table.parts[0].exercises} />
            <Part part={table.parts[1].name} exercises={table.parts[1].exercises}/>
            <Part part={table.parts[2].name} exercises={table.parts[2].exercises} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
    }    
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
