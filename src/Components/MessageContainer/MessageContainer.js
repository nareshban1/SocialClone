import React,{useRef } from "react";
import "./index.css";
import { ImCross } from "react-icons/im";
import Messages from "../Messages/Messages";
import MessageForm from "../MessageForm/MessageForm";

function MessageContainer({ handleClick }) {

    const dummy= useRef();
    console.log(dummy)

  return (
    <div className="chatlistcontainer">
      <div className="chatlistheader">
        <p>Social Clone Super Chat</p>
        <ImCross onClick={handleClick} className="chatcross" />
      </div>
      <Messages dummy={dummy}/>
      
      <MessageForm dummy={dummy} />
      
    </div>
  );
}

export default MessageContainer;
