import React  from 'react'
import { useAuth } from '../../context/AuthContext';
import "./Authentication.css";

function Signin() {
    const {signInGoogle} = useAuth();

    const signInClick = async () => {
         await signInGoogle();
        
    };
    
    return (
        <button  className="signinbutton" onClick={signInClick}>
          Sign in with Google
        </button>
    )
}

export default Signin
