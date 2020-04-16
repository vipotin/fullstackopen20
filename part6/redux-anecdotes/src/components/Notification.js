import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hide = { visibility: 'hidden' }
  return (
    <div style={notification ? style : hide}>
      {notification}
    </div>
  )
}

export default Notification