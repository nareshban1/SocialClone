import React from "react";
import "./style.css"

function Toggle(props) {
  const {
    checked,
    onChange,
  } = props;


  return (
    <>
    <label className="switch">
        <input type="checkbox" checked={checked}
            onChange={e => onChange(e)} />
        <span className="slider round"></span>
        </label>
      <label>
      </label>
    </>
  );
}

export default Toggle;
