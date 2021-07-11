import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "./Authentication.css";

function Logout() {
    const {logout} = useAuth();
    const history = useHistory();
    const logoutuser =  async() => {
         await logout();
         history.push("/");
    };
    
    return (
        <button  className="signinbutton" onClick={logoutuser}>
          Log Out
        </button>
    )
}

export default Logout
