import React from 'react'

const Notification = ({ errorOccured, message }) => {

  if (message === null) return null

  const color = errorOccured ? 'red' : 'green'
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style}>
      <em>{message}</em>
    </div>
  )
}

export default Notification