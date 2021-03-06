import { useMain } from "../../context/MainContext";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";
const Sidebar = () => {
  const { following } = useMain();
  const {currentUser} = useAuth();
  return (
    <>
      <div className="sidebar">
      {currentUser? <>
        <p>People you Follow</p>
        {following.length>0 ? <>
          {following.map(({ id, followingUser }) => (
            <Link className="displayFollowing" to={{ pathname: 'userprofile/' + followingUser.uid, state: followingUser.followingID }} key={id}>
              <img
                className="followprofileimg"
                src={followingUser.followingUserPic}
                alt="Profile"
              ></img>
              <h4>{followingUser.followingUserName}</h4>
            </Link>
          ))}

        </> : <><p>You are not following anyone</p> </>}
        </>:
        <>
        Login To show who you follow.
        </>
}
      </div>
    

    </>
  );
};

export default Sidebar;
