import React, { useState} from "react";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../Firebase";
import firebase from "firebase";


function MessageForm({dummy}) {

  const { currentUser } = useAuth();
  const [msg, setMsg] = useState("");
  const [inputerr, setInputErr] = useState("");
  const [valid, setValid] = useState("false");

  const validation = () => {
    const inputerr = {};
    let isValid = true;

    if (msg.trim().length < 1) {
      inputerr.captionShort = "Input a message";
      isValid = false;
    } else if (msg.trim().length > 100) {
      inputerr.captionShort = "Message too long";
      isValid = false;
    }
    setInputErr(inputerr);
    setValid(isValid);
    return isValid;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const isValid = validation();
    if (isValid) {
      firestore.collection("superchat").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        text: msg,
        userPic: currentUser.photoURL,
      });
      setMsg("");
      dummy?.current?.scrollIntoView({behavior:'smooth'});
    }
  };

  return (
        <>
      
      <div className="chatinput">
        <form className="sendMessageForm" onSubmit={handleUpload}>
          <input
            type="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="Send Message"
            className="chatInputForm"
          ></input>
          <button
            disabled={!msg.length}
            className="sendMessagebtn"
            type="submit"
          >
            Send
          </button>
        </form>
        
      </div>
      
    </>
  );
}

export default MessageForm;
