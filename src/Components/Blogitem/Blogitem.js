import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SubMenu from "../SubMenu/SubMenu";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Signin from "../Authentication/Signin";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Share from "./Share";
import { firestore } from "../../Firebase";
import "./Blogitem.css";
import { Link } from "react-router-dom";
const Blogitem = ({ post, id }) => {
  const { currentUser } = useAuth();
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(0);
  const [docID, setDOCID] = useState("");
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setView(!view);
  };

  const handleLike = () => {
    if (liked === false) {
      // console.log("liking");
      firestore.collection("likes").add({
        postId: id,
        user: currentUser.uid,
      });
      setLiked(true);
    } else {
      if (docID) {
        firestore.collection("likes").doc(docID).delete();
        // console.log("disliked")
        setDOCID("");
        setLiked(false);
      }
    }
  };

  useEffect(() => {
    let componentMounted = true;
    const getLikeDocs = async () => {
      await firestore
        .collection("likes")
        .where("postId", "==", `${id}`)
        .onSnapshot((snapshot) => {
          if (componentMounted) {
            setLikes(snapshot.docs.length);
          }
        });
    };

    const checkLiked = async () => {
      if (currentUser) {
        await firestore
          .collection("likes")
          .where("user", "==", `${currentUser.uid}`)
          .where("postId", "==", `${id}`)
          .onSnapshot((snapshot) => {
            if (snapshot.docs.length === 1) {
              if (componentMounted) {
                setLiked(true);
                setDOCID(snapshot.docs[0].id);
              }
            } else {
              if (componentMounted) {
                setDOCID("");
                setLiked(false);
              }
            }
          });
      }
    };
    checkLiked();
    getLikeDocs();
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <>
      <div className="blog-item" key={id}>
        <div className="blog-item-header">
          <div className="blog-user">
            <div className="blog-user-detail">
              Posted By:
              {currentUser ? (
                <>
                  {currentUser.uid === post.uid ? (
                    <Link className="item-links " to="/profile">
                      <p className="blog-username">{post.displayName}</p>
                    </Link>
                  ) : (
                    <Link
                      className="item-links"
                      to={{
                        pathname: "/userprofile/" + post.displayName,
                        state: post.uid,
                      }}
                    >
                      <p className="blog-username">{post.displayName}</p>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    className="item-links"
                    to={{
                      pathname: "userprofile/" + post.displayName,
                      state: post.uid,
                    }}
                  >
                    <p className="blog-username">{post.displayName}</p>
                  </Link>{" "}
                </>
              )}
              <img className="userPic" src={post.userPic} alt=""></img>
            </div>

            <div className="blog-user-menu">
              {currentUser && currentUser.uid === post.uid ? (
                <>
                  <SubMenu docid={id} post={post} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <p className="blogtime">
            {post.timestamp ? (
              <>{post.timestamp.toDate().toDateString()}</>
            ) : (
              <></>
            )}
          </p>
          <h3>{post.caption}</h3>
        </div>
        <div>
          <div className="blog-item-content">{post.text}</div>
          <img className="postImage" src={post.photoURL} alt=""></img>
        </div>
        <div className="post-menu">
          {currentUser ? (
            <div className="viewpostbtns" onClick={handleLike}>
              <AiFillLike className={liked ? "likedbtn" : "likebtn"} /> {likes}
            </div>
          ) : (
            <div className="viewpostbtns">
              <AiFillLike className={liked ? "likedbtn" : "likebtn"} /> {likes}
            </div>
          )}
          <div onClick={handleClick} className="viewpostbtns">
            <BiCommentDetail className="commentbtn" />
          </div>
          <Share id={id} />
        </div>
        <div className="commentSection">
          {view ? (
            <>
              <div className="postCommentSection">
                {currentUser ? (
                  <CommentForm id={id} />
                ) : (
                  <>
                    {" "}
                    <Signin />
                    <p className="signInPost">to Post or Comment</p>
                  </>
                )}
              </div>
              <Comment postID={id} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogitem;
