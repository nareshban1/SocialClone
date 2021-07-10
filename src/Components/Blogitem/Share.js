import React from "react";
import "./Blogitem.css";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AiOutlineShareAlt } from "react-icons/ai";
export default function Share(props) {

  const getShareLink = () => {
    let URL = `https://social-clone.netlify.app/post/${props.id}`
    console.log(URL);
  }

  return (
    <div className="viewpostbtns dropdown">
      <AiOutlineShareAlt className="sharebtn" />
      <div className="dropdown_content">
        <FacebookShareButton onClick={getShareLink}
          url={URL}
          hashtag="#programing joke">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
    </div>
  );
}
