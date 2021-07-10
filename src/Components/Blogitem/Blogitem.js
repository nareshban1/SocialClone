import "./Blogitem.css";
import { useAuth } from "../../context/AuthContext";
import SubMenu from "../SubMenu/SubMenu";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Signin from "../Authentication/Signin";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import Share from "./Share";


const Blogitem = ({ post, id }) => {

  const { currentUser } = useAuth();
  const [view, setView] = useState(false)

  const handleClick = () => {
    setView(!view);
  }
  
  return (
    <> 
    <div className="blog-item" key={id}>
      <div className="blog-item-header">
        <div className="blog-user">
          <div className="blog-user-detail">
            Posted By:
            <p className="blog-username">{post.displayName}</p>
            <img className="userPic" src={post.userPic} alt=""></img>

          </div>

          <div className="blog-user-menu">
            {currentUser && currentUser.uid === post.uid ? <><SubMenu docid={id} post={post} /></> : <></>}
          </div>

        </div>
        <p className="blogtime">{post.timestamp ? <>{post.timestamp.toDate().toDateString()}</> : <></>}</p>
        <h3>{post.caption}</h3>
      </div>
      <div>
        <div className="blog-item-content">{post.text}</div>
        <img className="postImage" src={post.photoURL} alt=""></img>
      </div>
      <div className="post-menu">
        <div className="viewpostbtns"><AiFillLike className="likebtn" /></div>
        <div onClick={handleClick} className="viewpostbtns" ><BiCommentDetail className="commentbtn" /></div>
        <Share id={id} />
      </div>
      <div className="commentSection">
        {view ? <>
          <div className="postCommentSection">
            {currentUser ?
              <CommentForm id={id} /> : <> <Signin />
                <p className="signInPost">to Post or Comment</p></>}
          </div>
          <Comment postID={id} /></> : <></>}
      </div>
    </div>

    </>
  );
};

export default Blogitem;
