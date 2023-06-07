import React from 'react'

const Goodtrait = (props) => {
  return (
    <div className="positive-item" onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
    <div className="positive-item-icon"><img src={props.icon} alt="" /></div>
    <div className="positive-item-name">{props.name}</div>
    <div className="positive-item-points">{props.value}</div>
  </div>
  )
}

export default Goodtrait