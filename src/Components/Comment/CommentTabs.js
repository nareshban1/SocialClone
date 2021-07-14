import React, { useState, useEffect } from 'react'
import "./style.css";
import { BiReply } from 'react-icons/bi'
import { useAuth } from '../../context/AuthContext';
import CommentMenu from './CommentMenu';
import CommentReply from './CommentReply';
import Signin from '../Authentication/Signin';
function CommentTabs({id,comment}) {
    const [view, setView] = useState(false);
    const { currentUser } = useAuth();


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
                    {/* <p className="comment-timestamp">{comment.timestamp.toDate().toDateString()}</p> */}
                </div>
                <p className="comment-text">{comment.comment}</p>
            </div>

            <div className="commentmenudiv" >
                <BiReply className="comment-menu reply_icon" onClick={handleClick} />

                {currentUser && currentUser.uid === comment.uid ? (
                    <>
                        <CommentMenu docid={id} comment={comment} />
                    </>
                ) : (
                    <></>
                )}
            </div>
            

        </div>
        <div className="replySection">
        {view ? (
            <>
                <div className="postReplySection">
                    {currentUser ? (
                        <CommentReply id={id} setView={setView} />
                    ) : (
                        <>
                            {" "}
                            <Signin />
                            <p className="signInPost">to Reply</p>
                        </>
                    )}
                </div>

            </>
        ) : (
            <></>
        )}
    </div>
    </>
    )
}

export default CommentTabs
