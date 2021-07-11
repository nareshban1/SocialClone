import React  from 'react'
import { useAuth } from '../../context/AuthContext';
import "./Authentication.css";
import { firestore } from "../../Firebase";

function Signin() {
    const {signInGoogle} = useAuth();

    const signInClick = async () => {
         await signInGoogle().then((user) => {
           const userMap = {
            uid: user.user.uid,
            email:  user.user.email,
            displayName: user.user.displayName,
            photoUrl: user.user.photoURL,
            created: user.user.metadata.creationTime,
            lastsignin: user.user.metadata.lastSignInTime,
          };
           firestore.collection('user').doc(user.user.uid).set(userMap);
         });
         
        
    };
    
    return (
        <button  className="signinbutton" onClick={signInClick}>
          Sign in with Google
        </button>
    )
}

export default Signin
