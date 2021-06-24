import React,{useState, useEffect} from 'react'
import { firestore } from '../../Firebase';
import Blogitem from "../Blogitem/Blogitem";


function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
           firestore.collection("posts").orderBy('timestamp', "desc").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id:doc.id, post:doc.data()
            })))

        })
        }, [])
    return (
        <>
            <Blogitem props={posts}></Blogitem>
        </>
    )
}

export default Feed
