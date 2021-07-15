import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";

import Feed from "../Feed/Feed";
import CreatePost from "../CreatePost/CreatePost";
function Home() {
  return (
    <>
      <div className="main-content">
        <div className="posts">
          <CreatePost />
          <div className="blog-list">
            <Feed></Feed>
          </div>
        </div>
        <div className="sidemenu">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Home;
