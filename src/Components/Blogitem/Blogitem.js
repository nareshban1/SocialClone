import "./Blogitem.css";
import { useAuth } from "../../context/AuthContext";
import SubMenu from "../SubMenu/SubMenu";



const Blogitem = (props) => {

  const { currentUser } = useAuth();


  return (
    <>
    {props.props.length ? <>
      {props.props.map(({id,post}) => (
        <div className="blog-item" key={id}>
          <div className="blog-item-header">
            <div className="blog-user">
              <div className="blog-user-detail">
                Posted By a tori laure named:
                <p className="blog-username">{post.displayName}</p>
                <img className="userPic" src={post.userPic} alt=""></img>
              </div>
              
              <div className="blog-user-menu">
                { currentUser && currentUser.uid === post.uid ? <><SubMenu docid={id} post={post}  /></>:<></>}
              </div>
              
            </div>
            <h3>{post.caption}</h3>
          </div>
          <div className="blog-item-content">{post.text}</div>
          <img className="postImage" src={post.photoURL} alt=""></img>
        </div>
      ))}</> :<><div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
              </div></>}
    </>
  );
};

export default Blogitem;
