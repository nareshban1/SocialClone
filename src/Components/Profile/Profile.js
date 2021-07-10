import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import Blogitem from "../Blogitem/Blogitem";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import CreatePost from "../CreatePost/CreatePost";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      firestore
        .collection("posts")
        .where("uid", "==", `${currentUser.uid}`)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    }
  }, [currentUser]);

  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
      {currentUser ? (
        <div className="main-profile">
          <div className="your-posts">
            <CreatePost />
            <div className="blog-list">
              {posts.length ? (
                <>
                  {posts.map(({ id, post }) => (
                    <Blogitem post={post} id={id}></Blogitem>
                  ))}
                </>
              ) : (
                <>
                  <div className="blog-item">
                    <div className="blog-item-content">
                      There Are No Posts To Display
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="sideprofile">
            <div className="profile">
              <img
                className="profileimage"
                src={currentUser.photoURL}
                alt="Profile"
              />
              <p className="profilename">{currentUser.displayName}</p>
              <div className="otherinfo">
                <p>
                  Email<span> {currentUser.email} </span>
                </p>
                <p>{currentUser.emailVerified}</p>
                {currentUser.phoneNumber ? (
                  <p>
                    Phone Number<span>{currentUser.phoneNumber}</span>
                  </p>
                ) : (
                  <></>
                )}
                <p>
                  Joined Date<span>{currentUser.metadata.creationTime}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader"><GridLoader color={"#FF5700"} css={ override }/></div>
      )}
    </>
  );
}

export default Profile;
