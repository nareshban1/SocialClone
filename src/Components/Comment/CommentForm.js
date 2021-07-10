import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase";
import { firestore } from "../../Firebase";
import "./style.css";

function CommentForm({ id }) {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");

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
      addComment();
    }
  };
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
          <button disabled={!comment} className="commentSubmit" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
