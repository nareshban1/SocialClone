import React from 'react'
import "./ProgressBar.css";

function ProgressBar({progress}) {
    return (
        <div className="progress-bar" style ={{width:progress + '%',height:"2px", margin: "5px 0px"}}>
        </div>
    )
}

export default ProgressBar
