import "./Blogitem.css";
import { useAuth } from "../../context/AuthContext";
import SubMenu from "../SubMenu/SubMenu";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Signin from "../Authentication/Signin";
import { useState } from "react";
import { MdDragHandle } from "react-icons/md";


const Blogitem = (props) => {

  const { currentUser } = useAuth();
  const [view, setView] = useState(false)

const handleClick =() =>{
  setView(!view);
}
  return (
    <>
    {props.props.length ? <>
      {props.props.map(({id,post}) => (
        <div className="blog-item" key={id}>
          <div className="blog-item-header">
            <div className="blog-user">
              <div className="blog-user-detail">
                Posted By:
                <p className="blog-username">{post.displayName}</p>
                <img className="userPic" src={post.userPic} alt=""></img>
                
              </div>
              
              <div className="blog-user-menu">
                { currentUser && currentUser.uid === post.uid ? <><SubMenu docid={id} post={post}  /></>:<></>}
              </div>
              
            </div>
            <p className="blogtime">{post.timestamp.toDate().toDateString()}</p>
            <h3>{post.caption}</h3>
          </div>
          <div>
          <div className="blog-item-content">{post.text}</div>
          <img className="postImage" src={post.photoURL} alt=""></img>
          </div>
          <div className="post-menu">
            <p onClick={handleClick} className="viewcommentbtn">Comments</p>
            <p onClick={handleClick} className="viewcommentbtn">Like Post</p>
            <p onClick={handleClick} className="viewcommentbtn">Share</p>
          </div>
          
          <div className="commentSection">
            
             {view ? <><div className="postCommentSection">
            {currentUser? <> <CommentForm id={id} /></> : <> <Signin />
                <p className="signInPost">to Post or Comment</p></>}
            </div>
            <Comment postID={id}/></>:<></>}
              
          </div>
        </div>
      ))}</> :<><div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
              </div></>}
    </>
  );
};

export default Blogitem;
