import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase";
import { firestore } from "../../Firebase";
import "./style.css";

function CommentReply({ id,setView }) {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");

  const addComment = async () => {
    await firestore.collection("replys").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment: comment,
      uid: currentUser.uid,
      commentID: id,
      displayName: currentUser.displayName,
      displayPic: currentUser.photoURL,
    });

    setComment("");
    setView(false);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (comment !== "") {
      addComment();
    }
  };
  return (
    <>
      <form className="replyInputtab" onSubmit={handleUpload}>
        <div className="replyform">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="createReply"
            placeholder="Your Reply"
          ></textarea>
          <button disabled={!comment} className="replySubmit" type="submit">
            Reply
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentReply;
