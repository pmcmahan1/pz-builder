import React from "react";

const Occupation = (props) => {
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      onMouseEnter={(e) => console.log(props.desc)}
    >
      <img src={props.icon} alt="" />
      {props.name}
    </div>
  );
};

export default Occupation;
