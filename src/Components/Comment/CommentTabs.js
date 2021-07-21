import React, { useState, useEffect } from "react";
import "./style.css";
import { BiReply } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import CommentMenu from "./CommentMenu";
import CommentReply from "./CommentReply";
import Signin from "../Authentication/Signin";
import { firestore } from "../../Firebase";
import ReplyMenu from "./ReplyMenu";
function CommentTabs({ id, comment,postID}) {
  const [view, setView] = useState(false);
  const { currentUser } = useAuth();
  const [replys, setReplys] = useState([]);
 
    useEffect(() => {
      let componentMounted = true;
        firestore
          .collection("replys").where("commentID","==",`${id}`)
          .onSnapshot((snapshot) => {
            if (componentMounted) {
              setReplys(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  reply: doc.data(),
                }))
              );
            }
            
          });
          return () => {
            componentMounted = false;
          };
      },[id]);
    

  const handleClick = () => {
    setView(!view);
  };

  return (
    <>
      <div className="comment" key={id}>
        <img src={comment.displayPic} alt="" className="comment-userpic" />

        <div className="comment-tab">
          <div className="comment-userdetails">
            <p className="comment-username">{comment.displayName}</p>
          </div>
          <p className="comment-text">{comment.comment}</p>
        </div>

        <div className="commentmenudiv">
        {currentUser ? 
          <BiReply className="comment-menu reply_icon" onClick={handleClick} /> : <></>}

          {currentUser && currentUser.uid === comment.uid ? (
            <>
              <CommentMenu docid={id} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {replys ? (
        <>
          {replys.map(({ id, reply }) => (
             <div className="replys" key={id}>
             <img src={reply.displayPic} alt="" className="comment-userpic" />
     
             <div className="comment-tab">
               <div className="comment-userdetails">
                 <p className="comment-username">{reply.displayName}</p>
               </div>
               <p className="comment-text">{reply.comment}</p>
             </div>
     
             <div className="commentmenudiv">
     
               {currentUser && currentUser.uid === reply.uid ? (
                 <>
                   <ReplyMenu docid={id} postID={postID}/>
                 </>
               ) : (
                 <></>
               )}
             </div>
           </div>
          ))}
        </>
      ) : (
        <> </>
      )}
      
      
      <div className="replySection">
        {view ? (
          <>
            <div className="postReplySection">
              {currentUser ? (
                <CommentReply id={id} setView={setView} postID={postID} />
              ) : (
                <>
                </>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default CommentTabs;
