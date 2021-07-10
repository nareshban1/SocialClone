import React,{useState, useEffect} from 'react'
import { firestore } from '../../Firebase';
import Blogitem from "../Blogitem/Blogitem";


function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
           firestore.collection("posts").orderBy('timestamp', "desc").onSnapshot((snapshot) => {
               
            setPosts(snapshot.docs.map((doc) => (
                {
                id:doc.id, post:doc.data()
            })))

        })
        }, [])
    return (
        <>  
            {posts.length ? <>
                 {posts.map(({id,post}) => (
                      <Blogitem post={post} id={id}></Blogitem>
                 ))}
                 </>:<> <div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
              </div></>}
           
        </>
    )
}

export default Feed
