// 2.4 kurssitiedot

import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const Total = ({list}) => {
    return <p><b>total of {list.reduce((sum, value) => (sum + value))} exercises</b></p>
}

const Content = ({parts}) => parts.map((part) => <Part part={part.name} exercises={part.exercises} key={part.id} />)

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total list={course.parts.map((part) => part.exercises)}/>
        </div>
    )
}

const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        {courses.map((course) => <Course course={course} key={course.id}/>)}
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
