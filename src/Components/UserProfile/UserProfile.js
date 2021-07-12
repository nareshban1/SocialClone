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

  const changeStatus = () => {
    if (followStatus === false) {
      firestore.collection("follows").add({
        followingID: props.location.state,
        uid: currentUser.uid,
      });
      console.log("follow");
      setFollowStatus(true);
    } else {
      console.log("unfollow");
      console.log(docID);
      firestore.collection("follows").doc(docID).delete();
      setFollowStatus(false);
    }
  };

 

  useEffect(() => {
    let componentMounted = true;
    const getUserData = () => {
        firestore
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
          console.log("Error getting document:", error);
        });
      }
    
      
    
      const getUserPosts = () => {
            firestore
            .collection("posts")
            .where("uid", "==", `${props.location.state}`)
            .orderBy("timestamp", "desc")
            .limit(10)
            .onSnapshot((snapshot) => {
              setPosts(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  post: doc.data(),
                }))
              );
            });
        }

        const getFollowStatus = async () => {
            await firestore
              .collection("follows")
              .where("followingID", "==", `${props.location.state}`)
              .onSnapshot((snapshot) => {
                if (componentMounted) {
                  setFollowers(snapshot.docs.length);
                }
              });
    
            if (currentUser) {
              await firestore
                .collection("follows")
                .where("uid", "==", `${currentUser.uid}`)
                .where("followingID", "==", `${props.location.state}`)
                .onSnapshot((snapshot) => {
                  if (snapshot.docs.length === 1) {
                    if (componentMounted) {
                      setFollowStatus(true);
                      setDOCID(snapshot.docs[0].id);
                    }
                  } else {
                    if (componentMounted) {
                      setFollowStatus(false);
                    }
                  }
                });
            }
          };

      getUserData();
      getUserPosts();
      getFollowStatus();
    
    return () => {
        componentMounted = false;
      };
  }, []);

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
                  Email<span> {user.email} </span>
                </p>
                <p>
                  Joined Date<span>{user.created}</span>
                </p>
                <p>
                  Last Seen<span>{user.lastsignin}</span>
                </p>
                <p>
                  Followers:<span>{followers}</span>
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
