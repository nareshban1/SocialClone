import React,{useState, useEffect} from 'react'
import { firestore } from '../../Firebase';
import Blogitem from '../Blogitem/Blogitem'
import "./Post.css";

function Post(props) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
           firestore.collection("posts").where( "__name__", "==", `${props.match.params.id}`).onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id:doc.id, post:doc.data()
            })))

        })
        }, [props.match.params.id])
    return (
        <div className="postView">
        {posts.length ? <>
            {posts.map(({id,post}) => (
                 <Blogitem post={post} id={id} key={id}/>
            ))}
            </>:<> <div className="blog-item" >
               <div className="blog-item-content">Nothing to View</div>
         </div></>}
         </div>
    )
}

export default Post
