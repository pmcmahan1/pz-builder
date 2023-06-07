import React from 'react'

const Badtrait = (props) => {
  return (
    <div className="negative-item" onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
    <div className="negative-item-icon"><img src={props.icon} alt="" /></div>
    <div className="negative-item-name">{props.name}</div>
    <div className="negative-item-points">+{props.value}</div>
  </div>
  )
}

export default Badtrait