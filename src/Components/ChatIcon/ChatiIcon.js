import React from 'react'
import "./index.css"
import {GrChat} from "react-icons/gr"
import {BsChatSquareDotsFill} from "react-icons/bs"

function ChatiIcon({onClick}) {
    return (
    <div className="chat" onClick={onClick}>
        <BsChatSquareDotsFill className="chaticon" />
      </div>
    )
}

export default ChatiIcon
