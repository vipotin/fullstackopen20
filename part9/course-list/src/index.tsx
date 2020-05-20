import React from "react";
import ReactDOM from "react-dom";

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

// Types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: "My new interface";
  exerciseMaterialLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// Helper methods
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Components
const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          <b>Name:</b> {part.name}
          <br></br><b>Exercise count:</b> {part.exerciseCount}
          <br></br><b>Description:</b> {part.description}
        </p>
      )
    case "Using props to pass data":
      return (
        <p>
          <b>Name:</b> {part.name}
          <br></br><b>Exercise count:</b> {part.exerciseCount}
          <br></br><b>Group project count:</b> {part.groupProjectCount}
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          <b>Name:</b> {part.name}
          <br></br><b>Exercise count:</b> {part.exerciseCount}
          <br></br><b>Description:</b> {part.description}
          <br></br><b>Submission link:</b> {part.exerciseSubmissionLink}
        </p>
      )
    case "My new interface":
      return (
        <p>
          <b>Name:</b> {part.name}
          <br></br><b>Exercise count:</b> {part.exerciseCount}
          <br></br><b>Description:</b> {part.description}
          <br></br><b>Exercise material:</b> {part.exerciseMaterialLink}
        </p>
      )
      default:
      return assertNever(part);
  }
};

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App: React.FC = () => {

const courseName = "Half Stack application development";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "My new interface",
    exerciseCount: 10,
    description: "I am learning new stuff",
    exerciseMaterialLink: "https://fullstackopen.com/en/part9/react_with_types"
  }
];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));