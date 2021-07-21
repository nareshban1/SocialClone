import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Signin from "../Authentication/Signin";
import Logout from "../Authentication/Logout";
import { useAuth } from "../../context/AuthContext";
import Toggle from "../../Toggle/Toggle";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function Navbar(props) {
  const [checked, setChecked] = useState(true);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    props.toggleTheme();
    setChecked(e.target.checked);
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="navlogo">
        <Link className="item-links" to="/" >
        <h1 className="logo">Social Clone</h1>
            </Link>
         
          <div className="togglediv">
            {showMenu ? (
              <span
                className="togglebtn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <ImCross />
              </span>
            ) : (
              <span
                className="togglebtn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaBars />
              </span>
            )}
          </div>
        </div>
        <ul className={`${showMenu ? "navlinks active" : "navlinks"}`}>
          <li className="navitems">
            <Toggle checked={checked} onChange={handleChange} />
          </li>
          <li className="navitems">
            <Link className="item-links" to="/" onClick={() => setShowMenu(!showMenu)}>
              Home
            </Link>
          </li>
            {currentUser ? (
              <>
               <li className="navitems">
                <Link className="item-links displayname" to="/profile" onClick={() => setShowMenu(!showMenu)}>
                  {currentUser.displayName}
                  <img
                    className="navprofileimg"
                    src={currentUser.photoURL}
                    alt=""
                  ></img>
                </Link>
                </li>
                <li className="navitems">
                <Logout />
                </li>
              </>
            ) : (
              <li className="navitems">
              <Signin />
              </li>
            )}
          
        </ul>
      </div>
    </>
  );
}

export default Navbar;

