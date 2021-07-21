import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase";
import { firestore } from "../../Firebase";
import "./style.css";

function CommentForm({ id }) {

  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [inputerr,setInputErr] = useState("");
  const addComment = async () => {
    await firestore.collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: comment,
      uid: currentUser.uid,
      postID: id,
      displayName: currentUser.displayName,
      displayPic: currentUser.photoURL,
    });

    setComment("");
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
      inputerr.captionShort = "Comment is too short, should be more than 10 characters"
      isValid=false;
  }

    if(comment.trim().length > 100){
      inputerr.captionLong = "Comment is too long, should be less than 100 characters"
      isValid=false;
  }

  setInputErr(inputerr);
  return isValid;
}
  return (
    <>
      <form className="commentInputtab" onSubmit={handleUpload}>
        <div className="commentform">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="createComment"
            placeholder="Your Comment"
          ></textarea>
          {Object.keys(inputerr).map((key) => {
                      return <div style={{color:"crimson"}} key={key}>{inputerr[key]}</div>
                    })}
          <button disabled={!comment} className="commentSubmit" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
