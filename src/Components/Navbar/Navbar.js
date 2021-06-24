import React, {  useState } from "react";
import "./Navbar.css";
import { Link} from "react-router-dom";
import Signin from "../Authentication/Signin"
import Logout from "../Authentication/Logout"
import { useAuth } from "../../context/AuthContext";
import Toggle from "../../Toggle/Toggle";


function Navbar(props) {
  const [checked, setChecked] = useState(true)
  const{ currentUser } = useAuth();
  


  const handleChange = (e) => {
    props.toggleTheme();
    setChecked(e.target.checked);
    
  };

  return (
    <>

      <div className="navbar">
        <h1>Social Clone</h1>
        <div className="links">

        <Toggle
        checked={checked}
        onChange={handleChange}
        />
          <Link className="linkitems" to="/">
            Home
          </Link>

         {currentUser ? <>
          <Link className="linkitems displayname" to="/profile">
           {currentUser.displayName}
           <img className="navprofileimg" src={currentUser.photoURL} alt="Profile"></img>
          </Link>
          <Logout/>
          </>
          : <Signin/>}
          
        
          
          
        </div>
      </div>
      
   </>
   
  );
}

export default Navbar;
