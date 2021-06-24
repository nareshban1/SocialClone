import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase';
import Blogitem from "../Blogitem/Blogitem";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
function Profile() {
    const [posts, setPosts] = useState([])
    const { currentUser } = useAuth();
    useEffect(() => {
        if (currentUser) {
            firestore.collection("posts").where("uid", "==", `${currentUser.uid}`).orderBy('timestamp', "desc").onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id, post: doc.data()
                })))

            })
        }
    }, [currentUser])




    return (
        <>
            {currentUser ?
                <div className="main-profile">
                    <div className="your-posts">
                        <div className="blog-list">
                            <Blogitem props={posts} />
                        </div>
                    </div>
                    <div className="sideprofile">
                        <div className="profile">
                            <img className="profileimage" src={currentUser.photoURL} alt="Profile"/>
                            <p className="profilename">{currentUser.displayName}</p>
                            <div className="otherinfo">
                            <p>Email<span> {currentUser.email} </span></p>
                            <p>{currentUser.emailVerified}</p>
                            {currentUser.phoneNumber? 
                            <p>Phone Number<span>{currentUser.phoneNumber}</span></p> : <></>}
                            <p>Joined Date<span>{currentUser.metadata.creationTime}</span></p>
                            </div>
                            
                            


                        </div>
                    </div>
                </div> : <>LOADING</>}

        </>
    );
}

export default Profile
