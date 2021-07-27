import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import Blogitem from "../Blogitem/Blogitem";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthContext";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";

function UserProfile(props) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const [docID, setDOCID] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const changeStatus = async() => {
    if (followStatus === false && user) {
      await firestore.collection("follows").add({
        followingID: props.location.state,
        followingUserPic:user.photoUrl,
        followingUserName:user.displayName,
        uid: currentUser.uid,
        followerPic:currentUser.photoURL,
        followerName:currentUser.displayName,
      }).then(docRef => {
        setDOCID( docRef.id);
    });
      setFollowStatus(true);
    } else {
      if(docID){
      await firestore.collection("follows").doc(docID).delete().then(() =>
        {setDOCID("");
        setFollowStatus(false);}
      )
      }
    }
  };

 

  useEffect(() => {
    let componentMounted = true;
    const getUserData = async() => {
        await firestore
        .collection("user")
        .doc(props.location.state)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (componentMounted) {
              setUser(doc.data());
            }
          } else {
          }
        })
        .catch((error) => {
          // console.log("Error getting document:", error);
        });
      }
    
      
    
      const getUserPosts = async() => {
            await firestore
            .collection("posts")
            .where("uid", "==", `${props.location.state}`)
            .orderBy("timestamp", "desc")
            .limit(10)
            .onSnapshot((snapshot) => {
              if (componentMounted) {
              setPosts(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  post: doc.data(),
                }))
              );
              }
            });
        }

        const getFollowers = async () => {
          await firestore
              .collection("follows")
              .where("followingID", "==", `${props.location.state}`)
              .onSnapshot((snapshot) => {
                if (componentMounted) {
                  setFollowers(snapshot.docs.length);
                }
              });
        }

        const getFollowing = async () => {
          await firestore
              .collection("follows")
              .where("uid", "==", `${props.location.state}`)
              .onSnapshot((snapshot) => {
                if (componentMounted) {
                  setFollowing(snapshot.docs.length);
                }
              });
        }

        const getFollowStatus = async () => {
            if (currentUser) {
              await firestore
                .collection("follows")
                .where("uid", "==", `${currentUser.uid}`)
                .where("followingID", "==", `${props.location.state}`)
                .onSnapshot((snapshot) => {
                  if (snapshot.docs.length === 1) {
                    if (componentMounted) {
                      if(snapshot.docs[0].id){
                      setDOCID(snapshot.docs[0].id);
                      }
                      

                      setFollowStatus(true);
                    }
                  } else {
                    if (componentMounted) {
                      setFollowStatus(false);
                      setDOCID("");
                    }
                  }
                });
            }
          };
      getFollowers();
      getUserData();
      getUserPosts();
      getFollowStatus();
      getFollowing();
    
    return () => {
        componentMounted = false;
      };
  }, [currentUser]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <>
      {user ? (
        <div className="main-profile">
          <div className="your-posts">
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
              <img className="profileimage" src={user.photoUrl} alt="Profile" />
              <p className="profilename">{user.displayName}</p>
              <div className="otherinfo">
                <p>
                  Joined Date<span>{user.created}</span>
                </p>
                <p>
                  Last Seen<span>{user.lastsignin}</span>
                </p>
                <p>
                  Followers:<span>{followers}</span> 
            
                </p>
                <p>
     
                  Following:<span>{following}</span> 
                </p>
                {currentUser ? (
                  <button className="follow" onClick={changeStatus}>
                    {followStatus ? "Following" : "Follow"}
                  </button>
                ) : (
                  <></>
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

export default UserProfile;
