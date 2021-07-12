import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import Blogitem from "../Blogitem/Blogitem";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import CreatePost from "../CreatePost/CreatePost";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

function Profile() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState([]);
  const [state, setstate] = useState([])

  useEffect(() => {
    if (currentUser) {
      firestore
        .collection("posts")
        .where("uid", "==", `${currentUser.uid}`)
        .orderBy("timestamp", "desc").limit(10)
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });

      getFollowers();
      getFollowing();
    }
  }, [currentUser]);

  const getFollowers = async () => {
    await firestore.collection('follows').where("followingID", "==", `${currentUser.uid}`).onSnapshot((snapshot) => {
      setFollowers(snapshot.docs.length);
    });
  }

  const getFollowing = async () => {
    
    await firestore.collection('follows').where("uid", "==", `${currentUser.uid}`).onSnapshot((snapshot) => {
      const arr = new Array();
        if(snapshot.empty){
          setFollowing([]);
        }
        else{
          snapshot.docs.map( async(doc)=>{
            await firestore.collection('user').where("uid", "==", `${doc.data().followingID}`).onSnapshot((snapshot) => {
              
              snapshot.docs.map((doc) =>{
                arr.push(doc.data());
                
                
              });
              setFollowing(
                snapshot.docs.map((doc) =>(
                  {
                    id: doc.id
                  }
                ))
                  
              )
              
            })
          })
        }
      
    });
  }

  console.log(following.length);
  
  const [showFollow, setShowFollow] = useState(false);

  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
      {currentUser ? (

        <div className="main-profile">
          <div>

          </div>
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
                  Followers:<span>{followers}</span>
                </p>
                <button className="showFollow " onClick={() => setShowFollow(!showFollow)} >Show Following</button>
              </div>
            </div>
            <div className={`${showFollow ? "followingList activef" : "followingList"}`}>
              <h3>Following List</h3>
              <div className="following">
                {following ? <>{following.map(({id,data}) => {
                  console.log(data);
                }
                  // <Link className="displayFollowing" to={{ pathname: 'userprofile/' + data.displayName, state: data.uid }} key={data.uid}>
                  //   <img
                  //     className="followprofileimg"
                  //     src={data.photoUrl}
                  //     alt="Profile"
                  //   ></img>
                  //   <h4>{data.displayName}</h4>

                  // </Link>
                )} </> : <><p>You do not follow anyone.</p></>}

              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="loader"><GridLoader color={"#FF5700"} css={override} /></div>
      )}
    </>
  );
}

export default Profile;
