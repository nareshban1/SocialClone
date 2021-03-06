import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import CommentTabs from "./CommentTabs";
import "./style.css";

function Comment(props) {
  const [comments, setComments] = useState([]);
  


  useEffect(() => {
    let componentMounted = true;
    firestore
      .collection("comments")
      .where("postID", "==", `${props.id}`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        if (componentMounted) {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data(),
          }))
        );
        }
      });
      return () => {
        componentMounted = false;
      };
  },[props.id]);


  return (
    <div className="viewComments">
      {comments ? (
        <>
          {comments.map(({ id, comment }) => (
            
              <CommentTabs id={id} comment={comment} key={id} postID={props.id}/>
          ))}
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default Comment;
