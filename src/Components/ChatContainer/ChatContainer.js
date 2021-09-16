import React, { useState } from "react";
import ChatiIcon from "../ChatIcon/ChatiIcon";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import MessageContainer from "../MessageContainer/MessageContainer";

function ChatContainer() {
  const { currentUser } = useAuth();
  const [openChat, setOpenChat] = useState(true);


  const handleClick = () => {
    setOpenChat(!openChat);
  };




  return (
    <>
      {currentUser && (
        <div className="chatcontainer">
          {openChat ? (
            <MessageContainer handleClick={handleClick}/>
          ) : (
            <ChatiIcon onClick={handleClick} />
          )}
        </div>
      )}
    </>
  );
}

export default ChatContainer;
