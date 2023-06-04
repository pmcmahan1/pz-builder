import React from 'react'

const Occupation = (props) => {

  return (
    <div className='occupation-item'><img src={props.icon} alt="" />{props.name}</div>
  )
}

export default Occupation