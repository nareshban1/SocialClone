import React,{  useState }  from 'react';
import "./CreatePost.css";
import { useAuth } from "../../context/AuthContext";
import Signin from "../Authentication/Signin";
import { MdAddAPhoto } from "react-icons/md";
import { storage, firestore } from "../../Firebase";
import ProgressBar from "../ProgressBar/ProgressBar";

import firebase from "firebase";
function CreatePost() {

    const { currentUser } = useAuth();
    const [caption, setCaption] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    
    const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
    
          var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
          var imagePreview = document.getElementById("image-preview");
          imagePreview.src = selectedImageSrc;
          imagePreview.style.display = "block";
        }
      };
    
      const handleUpload = (e) => {
        e.preventDefault();
        if (image) {
          const storageRef = storage.ref(`images/${image.name}`);
    
          storageRef.put(image).on(
            "state_changed",
            (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setProgress(percentage);
            },
            (err) => {
              setError(err);
              console.log(error);
            },
            async () => {
              await storageRef.getDownloadURL().then((imageUrl) => {
                firestore.collection("posts").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  text: text,
                  photoURL: imageUrl,
                  displayName: currentUser.displayName,
                  uid: currentUser.uid,
                  userPic: currentUser.photoURL,
                });
              });
              setText("");
              setProgress(0);
              setCaption("");
              setImage(null);
              var imagePreview = document.getElementById("image-preview");
              imagePreview.style.display = "none";
            }
          );
        } else {
          firestore.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            photoURL: null,
            displayName: currentUser.displayName,
            uid: currentUser.uid,
            text: text,
            userPic: currentUser.photoURL,
          });
          setProgress(0);
          setCaption("");
          setText("");
        }
      };



    return (
        <div className="postformsection">
        {currentUser ? (
          <>
            <div className="postLoggedIn">
              <p>Create Post</p>
              <div className="postLoggedInForm">
                <form onSubmit={handleUpload}>
                  <div>
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="createPostTitle" placeholder="Title" required></input>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="createPostInput"
                      placeholder="Text (Optional)"
                    ></textarea>
                    <div className="postLoggedInForm_ImagePreview">
                      <img id="image-preview" alt="" />
                    </div>
                  </div>
                  <div className="imageUpload">
                    <label htmlFor="addImage">
                      <MdAddAPhoto className="photoicon"
                        style={{ fontSize: "30px" }}
                      ></MdAddAPhoto>
                    </label>
                    <input
                      id="addImage"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    ></input>

                    <button disabled={!caption} className="createPostSubmit" type="submit">
                      Upload Post
                    </button>
                  </div>
                </form>
              </div>
              <div className="output">
                {progress !== 0 ? (
                  <ProgressBar progress={progress} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Signin />
            <p className="signInPost">to Post or Comment</p>
          </>
        )}
      </div>
    )
}

export default CreatePost
