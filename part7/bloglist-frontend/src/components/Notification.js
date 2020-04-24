import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  console.log(notification)

  if (!notification) return null

  const color = notification.error ? 'red' : 'green'
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
    <div style={style} className="notification">
      <em>{notification.message}</em>
    </div>
  )
}

export default Notification