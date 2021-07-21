import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase";
import { firestore } from "../../Firebase";
import "./style.css";

function CommentReply({ id,setView,postID}) {
  
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [inputerr,setInputErr] = useState("");

  const addComment = async () => {
    await firestore.collection("replys").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: comment,
      uid: currentUser.uid,
      commentID: id,
      postID: postID,
      displayName: currentUser.displayName,
      displayPic: currentUser.photoURL,
    });

    setComment("");
    setView(false);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (comment !== "") {
      const isValid=validation();
      if(isValid){
        addComment();
      }
      
    }
    else if (comment == ""){
      setInputErr("Input is empty");
    }
  };

  const validation = () =>{
    const inputerr ={};
    let isValid = true;

    if(comment.trim().length < 10 && comment.trim().length > 0){
      inputerr.captionShort = "Reply is too short, should be more than 10 characters"
      isValid=false;
  }

    if(comment.trim().length > 100){
      inputerr.captionLong = "Reply is too long, should be less than 100 characters"
      isValid=false;
  }

  setInputErr(inputerr);
  return isValid;
}

  return (
    <>
      <form className="replyInputtab" onSubmit={handleUpload} >
        <div className="replyform">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="createReply"
            placeholder="Your Reply"
          required></textarea>
          {Object.keys(inputerr).map((key) => {
                      return <div style={{color:"crimson"}} key={key}>{inputerr[key]}</div>
                    })}
          <button disabled={!comment} className="replySubmit" type="submit">
            Reply
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentReply;
