import React from 'react';

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

export default Course