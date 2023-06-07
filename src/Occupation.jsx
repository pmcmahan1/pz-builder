import React from "react";

const Occupation = (props) => {
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter} 
      onMouseLeave={props.onMouseLeave}
    >
      <img src={props.icon} alt="" />
      {props.name}
    </div>
  );
};

export default Occupation;
