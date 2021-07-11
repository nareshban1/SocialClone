import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase';
import Blogitem from "../Blogitem/Blogitem";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./Feed.css";

const override = css`
display: block;
margin: 0 auto;
`;
function Feed() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firestore.collection("posts").orderBy('timestamp', "desc").onSnapshot((snapshot) => {

            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id, post: doc.data()
                })))
            setLoading(false);

        })


    }, [])
    return (
        <>  {loading ? <><div className="feedloader"><GridLoader color={"#FF5700"} css={override} /></div>
        </> :
            <>
                {posts.length ? <>
                    {posts.map(({ id, post }) => (
                        <Blogitem post={post} id={id} key={id}></Blogitem>
                    ))}
                </> : <> <div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
                </div></>}
            </>}

        </>
    )
}

export default Feed
