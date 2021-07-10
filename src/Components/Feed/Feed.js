import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase';
import Blogitem from "../Blogitem/Blogitem";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./Feed.css";
import { fetchMorePost, fetchPost } from '../../service/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import FlatList from 'flatlist-react';

const override = css`
display: block;
margin: 0 auto;
`;
function Feed() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [startAfter, setStartAfter] = useState([]);
    const [lastPost, setLastPost] = useState(false);

    
    // const getPosts= () => {
    //     firestore.collection("posts").orderBy('timestamp', "desc").limit(5).onSnapshot((snapshot) => {
    //         setPosts(snapshot.docs.map((doc) => (
    //             {
    //                 id: doc.id, post: doc.data()
    //             })))
    //         setLoading(false);
    //         console.log(startAfter);
    //     })
    // }

    const getMorePosts= async() => {
        
        if(!lastPost && startAfter){
        const postsData = await fetchMorePost(startAfter);
        setPosts([...posts,...postsData.posts]);
        setStartAfter(postsData.lastVisible);
        postsData.posts.length == 0? setLastPost(true):setLastPost(false);
        }

      
    }

    const getPostsTest = async() => {
        const postsData = await fetchPost();
        setPosts([...posts,...postsData.posts]);
        setStartAfter(postsData.lastVisible);
        setLoading(false);
        console.log(posts);
        
    }


    useEffect(() => {
           getPostsTest();
           
    }, [])

        

    return (
        <>  {loading ? <><div className="feedloader"><GridLoader color={"#FF5700"} css={override} /></div>
        </> :
            <>
                {posts.length ? <>
                <FlatList list={posts} renderItem={(item) => <Blogitem post={item} id={item.postID}></Blogitem>} hasMoreItems={!lastPost} loadMoreItems={getMorePosts} paginationLoadingIndicator={<div style={{background: 'none'}}>Getting more items...</div>}>

                    </FlatList>
                
                </> : <> <div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
                </div></>}
            </>}

        </>
    )
}

export default Feed

// {posts.map((post) => (
//     <Blogitem post={post} id={post.postID}></Blogitem>

// ))}
