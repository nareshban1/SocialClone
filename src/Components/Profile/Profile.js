import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import Blogitem from "../Blogitem/Blogitem";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import CreatePost from "../CreatePost/CreatePost";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useMain } from "../../context/MainContext";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  const [followerUser, setFollowersUser] = useState([]);
  const {following,followers} = useMain();
  const [isMounted, setIsMounted] = useState(true);
  const [showFollow, setShowFollow] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (currentUser) {
      getCurrentUserPosts();
      

    }
    return () => {
      setIsMounted(false);
    };
  }, [currentUser]);

  const getCurrentUserPosts = async () => {
    await firestore
      .collection("posts")
      .where("uid", "==", `${currentUser.uid}`)
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        if (isMounted) {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        }
      });
  };

  // const getFollowers = async () => {
  //   await firestore
  //     .collection("follows")
  //     .where("followingID", "==", `${currentUser.uid}`)
  //     .onSnapshot((snapshot) => {
  //       if (isMounted) {
  //         setFollowers(snapshot.docs.length);
  //       }
  //     });
  // };

  


 




  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <>
      {currentUser ? (
        <div className="main-profile">
          <div></div>
          <div className="your-posts">
            <CreatePost />
            <div className="blog-list">
              {posts.length ? (
                <>
                  {posts.map(({ id, post }) => (
                    <Blogitem post={post} id={id} key={id}></Blogitem>
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
                <p>
                  Followers:<span>{followers.length}</span>
                </p>
                <p>
                  Following:<span>{following.length}</span> 
                </p>
                <button
                  className="showFollow "
                  onClick={() => setShowFollow(!showFollow)}
                >
                  Show Following
                </button>
              </div>
            </div>
            <div
              className={`${showFollow ? "followingList activef" : "followingList"
                }`}
            >
              <h3>Following List</h3>
              <div className="following">
                {following.length>0  ? (
                  <>
                    {following.map(({ id, followingUser }) => (
                      <Link className="displayFollowing" to={{ pathname: 'userprofile/'+followingUser.followingUserName, state: followingUser.followingID }} key={id}>
                        <img
                          className="followprofileimg"
                          src={followingUser.followingUserPic}
                          alt="Profile"
                        ></img>
                        <h4>{followingUser.followingUserName}</h4>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <p>You do not follow anyone.</p>
                  </>
                )}
              </div>
            </div>
            <div
              className={`${showFollow ? "followingList activef" : "followingList"
                }`}
            >
              <h3>Follower List</h3>
              <div className="following">
                {followers.length>0  ? (
                  <>
                    {followers.map(({ id, user }) => (
                      <Link className="displayFollowing" to={{ pathname: 'userprofile/'+user.followingID, state: user.followingID }} key={id}>
                        <img
                          className="followprofileimg"
                          src={user.followerPic}
                          alt="Profile"
                        ></img>
                        <h4>{user.followerName}</h4>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <p>No Followers.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <GridLoader color={"#FF5700"} css={override} />
        </div>
      )}
    </>
  );
}

export default Profile;
